// custom md parser that uses marked and DOMPurify under the hood
// =============================================================================

import { marked } from "marked";
import DOMPurify from "dompurify";

export const parseMarkdown = (markdown: string): string => {
  const html = marked(markdown, { breaks: true });

  const sanitizedHtml = DOMPurify.sanitize(html);
  return sanitizedHtml;
};
