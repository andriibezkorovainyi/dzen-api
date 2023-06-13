import { JSDOM } from 'jsdom';

export function validateCommentData(body: string): boolean {
  const allowedTags = ['a', 'code', 'i', 'strong'];
  const dom = new JSDOM(body);

  const elements = Array.from(dom.window.document.body.childNodes);

  for (const element of elements) {
    if (element.nodeType === dom.window.document.ELEMENT_NODE) {
      const tagName = element.nodeName.toLowerCase();

      if (!allowedTags.includes(tagName)) {
        return false;
      }

      if (!isTagClosed(element)) {
        return false;
      }
    } else if (element.nodeType === dom.window.document.TEXT_NODE) {
      if (element === null) return false;

      const text = element.textContent.trim();

      if (text.length > 0) {
        return false;
      }
    }
  }

  return true;
}

function isTagClosed(element: Node): boolean {
  const openTags = [];

  const traverse = (node: Node) => {
    if (node.nodeType === node.ELEMENT_NODE) {
      openTags.push(node.nodeName.toLowerCase());

      for (const childNode of Array.from(node.childNodes)) {
        traverse(childNode);
      }

      openTags.pop();
    }
  };

  traverse(element);

  return openTags.length === 0;
}

// Example usage:
const text1 = 'This is a valid text';
console.log('Is text1 valid:', validateCommentData(text1)); // Output: Is text1 valid: true

const text2 =
  '<a href="#" title="Link">Test</a> <code>console.log("Hello, world!")</code> <i>Italic</i> <strong>Bold</strong>';
console.log('Is text2 valid:', validateCommentData(text2)); // Output: Is text2 valid: true

const text3 = '<div>Invalid text</div>';
console.log('Is text3 valid:', validateCommentData(text3)); // Output: Is text3 valid: false
