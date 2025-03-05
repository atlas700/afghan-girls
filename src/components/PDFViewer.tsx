"use client";

import { useState, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css"; // For text selection
import "react-pdf/dist/Page/TextLayer.css"; // For text rendering

// Shadcn-ui components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Icons from lucide-react
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  Image as ImageIcon,
  Loader2,
  MessageSquare,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { Card, CardContent } from "./ui/card";

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

interface PdfViewerProps {
  pdfPath: string;
}

export default function PdfViewer({ pdfPath }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [naturalWidth, setNaturalWidth] = useState<number>(0);
  const [naturalHeight, setNaturalHeight] = useState<number>(0);
  const [zoomFactor, setZoomFactor] = useState<number>(1.0);
  const [overflow, setOverflow] = useState<"hidden" | "auto">("hidden");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pdfContainerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [aiResponse, setAiResponse] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [pageText, setPageText] = useState<string>("");
  const [userQuestion, setUserQuestion] = useState<string>("");
  const [pageInputValue, setPageInputValue] = useState<string>("1");
  const [selectedText, setSelectedText] = useState<string>("");

  // Restore last visited page
  useEffect(() => {
    if (numPages > 0) {
      const savedPage = localStorage.getItem(`lastPage_${pdfPath}`);
      if (savedPage) {
        const pageNum = parseInt(savedPage, 10);
        if (pageNum >= 1 && pageNum <= numPages) {
          setPageNumber(pageNum);
          setPageInputValue(pageNum.toString());
        }
      }
    }
  }, [numPages, pdfPath]);

  // Save current page on change
  useEffect(() => {
    if (pageNumber >= 1 && pageNumber <= numPages && numPages > 0) {
      localStorage.setItem(`lastPage_${pdfPath}`, pageNumber.toString());
      setPageInputValue(pageNumber.toString());
    }
  }, [pageNumber, numPages, pdfPath]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  // Zoom controls
  const zoomIn = () => setZoomFactor((prev) => Math.min(prev + 0.2, 3.0));
  const zoomOut = () => setZoomFactor((prev) => Math.max(prev - 0.2, 0.5));
  const resetZoom = () => setZoomFactor(1.0);

  // Rotation controls
  const [rotation, setRotation] = useState<number>(0);
  const rotateClockwise = () => setRotation((prev) => (prev + 90) % 360);

  // Navigation
  const goToPrevPage = () => setPageNumber((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () =>
    setPageNumber((prev) => Math.min(prev + 1, numPages));

  const goToPage = (e: React.FormEvent) => {
    e.preventDefault();
    const pageNum = parseInt(pageInputValue, 10);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= numPages) {
      setPageNumber(pageNum);
    } else {
      setPageInputValue(pageNumber.toString());
    }
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      viewerRef.current?.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setFullscreen(true);
    } else {
      document.exitFullscreen();
      setFullscreen(false);
    }
  };

  // Listen for fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Save image of current page
  const saveImage = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `page-${pageNumber}.png`;
    link.click();
  };

  // Copy selected text
  const copyText = () => {
    if (selectedText) {
      navigator.clipboard.writeText(selectedText);
      // Show a toast or notification here
    } else {
      // Show a toast or notification here
    }
  };

  // Extract text and natural dimensions from the current page
  const onRenderSuccess = async (page: any) => {
    try {
      const textContent = await page.getTextContent();
      const pageTextContent = textContent.items
        .map((item: any) => item.str)
        .join(" ")
        .trim();
      setPageText(pageTextContent);

      const viewport = page.getViewport({ scale: 1, rotation });
      setNaturalWidth(viewport.width);
      setNaturalHeight(viewport.height);
    } catch (error) {
      console.error("Error extracting text content:", error);
    }
  };

  // Calculate scale and overflow based on zoom
  useEffect(() => {
    if (pdfContainerRef.current && naturalWidth > 0 && naturalHeight > 0) {
      const containerWidth = pdfContainerRef.current.clientWidth;
      const containerHeight = pdfContainerRef.current.clientHeight;

      // Account for rotation when calculating dimensions
      const isLandscape = rotation === 90 || rotation === 270;
      const contentWidth = isLandscape ? naturalHeight : naturalWidth;
      const contentHeight = isLandscape ? naturalWidth : naturalHeight;

      const scaleWidth = containerWidth / contentWidth;
      const scaleHeight = containerHeight / contentHeight;
      const baseScale = Math.min(scaleWidth, scaleHeight, 1.0); // Limit initial scale to 1.0 max
      const finalScale = baseScale * zoomFactor;
      setScale(finalScale);

      // Determine if scrollbars are needed
      const scaledWidth = contentWidth * finalScale;
      const scaledHeight = contentHeight * finalScale;
      if (scaledWidth > containerWidth || scaledHeight > containerHeight) {
        setOverflow("auto");
      } else {
        setOverflow("hidden");
      }
    }
  }, [naturalWidth, naturalHeight, pageNumber, pdfPath, zoomFactor, rotation]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (pdfContainerRef.current && naturalWidth > 0 && naturalHeight > 0) {
        const containerWidth = pdfContainerRef.current.clientWidth;
        const containerHeight = pdfContainerRef.current.clientHeight;

        // Account for rotation
        const isLandscape = rotation === 90 || rotation === 270;
        const contentWidth = isLandscape ? naturalHeight : naturalWidth;
        const contentHeight = isLandscape ? naturalWidth : naturalHeight;

        const scaleWidth = containerWidth / contentWidth;
        const scaleHeight = containerHeight / contentHeight;
        const baseScale = Math.min(scaleWidth, scaleHeight, 1.0);
        const finalScale = baseScale * zoomFactor;
        setScale(finalScale);

        const scaledWidth = contentWidth * finalScale;
        const scaledHeight = contentHeight * finalScale;
        if (scaledWidth > containerWidth || scaledHeight > containerHeight) {
          setOverflow("auto");
        } else {
          setOverflow("hidden");
        }
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [naturalWidth, naturalHeight, zoomFactor, rotation]);

  // Determine text direction based on script
  const getTextDirection = (text: string) => {
    if (!text) return "rtl"; // Default to RTL for empty input (Pashto/Persian context)
    const firstChar = text[0];
    const charCode = firstChar.charCodeAt(0);
    // Arabic script (Pashto/Persian) range: 0600–06FF
    return charCode >= 0x0600 && charCode <= 0x06ff ? "rtl" : "ltr";
  };

  // Improved text selection handling
  useEffect(() => {
    const handleMouseUp = () => {
      const selection = window.getSelection();
      if (selection && selection.toString().trim()) {
        setSelectedText(selection.toString().trim());

        // Only show tooltip if selection is within PDF container
        if (pdfContainerRef.current && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          if (pdfContainerRef.current.contains(range.commonAncestorContainer)) {
            const rects = range.getClientRects();
            if (rects.length > 0) {
              const rect = rects[rects.length - 1]; // Use last rect for RTL support
              const containerRect =
                pdfContainerRef.current.getBoundingClientRect();

              setTooltipPosition({
                x:
                  rect.right -
                  containerRect.left +
                  pdfContainerRef.current.scrollLeft -
                  80,
                y:
                  rect.bottom -
                  containerRect.top +
                  pdfContainerRef.current.scrollTop +
                  10,
              });
              setShowTooltip(true);
            }
          }
        }
      } else {
        setSelectedText("");
      }
    };

    // Hide tooltip when clicking elsewhere
    const handleClickOutside = (e: MouseEvent) => {
      if (
        showTooltip &&
        pdfContainerRef.current &&
        !pdfContainerRef.current.contains(e.target as Node)
      ) {
        setShowTooltip(false);
      }
    };

    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showTooltip]);

  // Ask AI using Ollama local LLM in streaming mode
  const handleAskAI = async (question: string) => {
    if (!question) {
      // Show a toast or notification here
      return;
    }

    setIsLoading(true);
    setSidebarOpen(true);
    setShowTooltip(false);
    setAiResponse("");

    try {
      const response = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "qwen2.5:3b",
          prompt: `Given the following page content: "${pageText}"\n\nAnswer the following question: "${question}"`,
          stream: true,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from Ollama");
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("Response body is not readable");
      }

      const decoder = new TextDecoder();
      let accumulatedResponse = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");
        for (const line of lines) {
          if (line.trim()) {
            try {
              const parsed = JSON.parse(line);
              if (parsed.response) {
                accumulatedResponse += parsed.response;
                setAiResponse(accumulatedResponse);
              }
            } catch (e) {
              console.error("Error parsing JSON:", e);
            }
          }
        }
      }

      if (!accumulatedResponse) {
        setAiResponse("No response from AI");
      }
    } catch (error) {
      console.error("Error asking AI:", error);
      setAiResponse("An error occurred while contacting the AI.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col items-center bg-background h-screen"
      dir="rtl"
      ref={viewerRef}
    >
      {/* Toggle Button for Sidebar */}
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-4 right-4 z-50 rounded-full shadow-md hover:shadow-lg"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <MessageSquare className="h-5 w-5" />
      </Button>

      {/* Controls Bar - Fixed at the top */}
      <Card className="sticky top-4 z-50 w-[95%] mx-auto shadow-md mb-4">
        <CardContent className="p-3">
          <div
            className="flex flex-wrap justify-between items-center gap-2"
            dir="ltr"
          >
            {/* Zoom Controls */}
            <div className="flex items-center gap-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={zoomOut}
                      disabled={zoomFactor <= 0.5}
                      className="h-8 w-8"
                    >
                      <ZoomOut className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Zoom Out</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Button
                variant="ghost"
                size="icon"
                onClick={zoomIn}
                disabled={zoomFactor >= 3.0}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={goToPrevPage}
                disabled={pageNumber <= 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {pageNumber} of {numPages}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={goToNextPage}
                disabled={pageNumber >= numPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size={"sm"} onClick={saveImage}>
                <ImageIcon className="h-4 w-4 mr-2" /> Save Image
              </Button>
              <Button variant="outline" size={"sm"} onClick={copyText}>
                <Copy className="h-4 w-4 mr-2" /> Copy Text
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* PDF Display Area */}
      <div
        className={`w-full mt-16 relative overflow-${overflow}`}
        style={{ height: "calc(100vh - 64px)" }}
        ref={pdfContainerRef}
      >
        <Document
          file={pdfPath}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={(error) => console.error("Error loading PDF:", error)}
          className="flex justify-center"
        >
          <Page
            pageNumber={pageNumber}
            scale={scale}
            renderTextLayer={true}
            renderAnnotationLayer={true}
            canvasRef={canvasRef}
            className="shadow-sm"
            onRenderSuccess={onRenderSuccess}
          />
        </Document>

        {/* Tooltip for "Ask AI" */}
        {showTooltip && (
          <div
            style={{
              position: "absolute",
              left: tooltipPosition.x,
              top: tooltipPosition.y,
              zIndex: 1000,
            }}
            className="bg-card border rounded shadow-md p-2"
          >
            <Button
              variant="default"
              size="sm"
              onClick={() => handleAskAI(getSelectedText())}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              Ask AI
            </Button>
          </div>
        )}
      </div>

      {/* Sidebar for AI Chat */}
      <div
        className={`fixed top-0 right-0 h-full w-3/4 md:w-3/6 bg-card shadow-lg z-50 p-4 flex flex-col transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-4" dir="ltr">
          <h3 className="text-lg font-bold text-foreground">Chat with AI</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <Input
            value={userQuestion}
            onChange={(e) => setUserQuestion(e.target.value)}
            placeholder="Ask a question..."
            className="w-full text-base"
            disabled={isLoading}
            dir={getTextDirection(userQuestion)}
          />
          <Button
            size={"lg"}
            onClick={() => handleAskAI(userQuestion)}
            disabled={isLoading || !userQuestion.trim()}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : null}
            Send
          </Button>
        </div>
        <div
          className="flex-1 overflow-y-auto text-xl leading-9 text-balance text-muted-foreground px-8"
          dir={getTextDirection(aiResponse)}
        >
          {isLoading && !aiResponse ? (
            <div className="flex justify-center items-center h-full">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : (
            aiResponse || "No response yet."
          )}
        </div>
      </div>
    </div>
  );
}
