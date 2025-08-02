/**
 * Renders formatted article content with support for:
 * - **bold** text
 * - *italic* text
 * - `code` snippets
 * - --- dividers
 * - Line breaks and paragraphs
 */

export const renderFormattedContent = (content) => {
  if (!content) return null;

  // Split content into paragraphs
  const paragraphs = content.split("\n\n").filter((p) => p.trim());

  return paragraphs.map((paragraph, index) => {
    if (paragraph.trim() === "---") {
      // Render divider
      return (
        <hr key={index} className="my-6 border-gray-300 dark:border-gray-600" />
      );
    }

    // Process inline formatting within paragraph
    const formattedText = processInlineFormatting(paragraph);

    return (
      <p key={index} className="mb-4 leading-relaxed">
        {formattedText}
      </p>
    );
  });
};

const processInlineFormatting = (text) => {
  const parts = [];
  let currentIndex = 0;

  // Regex patterns for different formatting
  const patterns = [
    { regex: /\*\*(.*?)\*\*/g, type: "bold" }, // **bold**
    { regex: /\*(.*?)\*/g, type: "italic" }, // *italic*
    { regex: /`(.*?)`/g, type: "code" }, // `code`
  ];

  // Find all matches and sort by position
  const matches = [];
  patterns.forEach(({ regex, type }) => {
    let match;
    while ((match = regex.exec(text)) !== null) {
      matches.push({
        start: match.index,
        end: match.index + match[0].length,
        content: match[1],
        type,
        fullMatch: match[0],
      });
    }
  });

  // Sort matches by start position
  matches.sort((a, b) => a.start - b.start);

  // Process matches and build parts array
  matches.forEach((match) => {
    // Add text before the match
    if (match.start > currentIndex) {
      parts.push({
        type: "text",
        content: text.substring(currentIndex, match.start),
      });
    }

    // Add the formatted content
    parts.push({
      type: match.type,
      content: match.content,
    });

    currentIndex = match.end;
  });

  // Add remaining text
  if (currentIndex < text.length) {
    parts.push({
      type: "text",
      content: text.substring(currentIndex),
    });
  }

  // Render parts
  return parts.map((part, index) => {
    switch (part.type) {
      case "bold":
        return (
          <strong key={index} className="font-bold">
            {part.content}
          </strong>
        );
      case "italic":
        return (
          <em key={index} className="italic">
            {part.content}
          </em>
        );
      case "code":
        return (
          <code
            key={index}
            className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono"
          >
            {part.content}
          </code>
        );
      default:
        return part.content;
    }
  });
};

/**
 * Preview component for formatted content
 */
export const ContentPreview = ({ content, className = "" }) => {
  if (!content) return null;

  return (
    <div
      className={`prose prose-gray dark:prose-invert max-w-none ${className}`}
    >
      {renderFormattedContent(content)}
    </div>
  );
};
