'use client';

import { useMemo } from 'react';
import type { JsonModel, JsonModelContent } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import { ImageOff } from 'lucide-react';

interface RichTextRendererProps {
  jsonModel: string | null;
  fallbackContent: string | null;
  renderedContent?: string | null;  // HTML content for old/migrated posts
}

export function RichTextRenderer({ jsonModel, fallbackContent, renderedContent }: RichTextRendererProps) {
  const content = useMemo(() => {
    if (!jsonModel) return null;
    try {
      const parsed: JsonModel = JSON.parse(jsonModel);
      return parsed.content;
    } catch (e) {
      console.error('Failed to parse JSON model', e);
      return null;
    }
  }, [jsonModel]);

  if (!content) {
    // For old/migrated posts, prefer renderedContent (HTML) over rawContent
    const htmlContent = renderedContent || (fallbackContent && fallbackContent.includes('<') ? fallbackContent : null);
    if (htmlContent) {
      return <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: htmlContent }} />;
    }
    return <div className="whitespace-pre-wrap">{fallbackContent || ''}</div>;
  }

  return (
    <div className="space-y-2 text-sm sm:text-base leading-relaxed wrap-break-word">
      {content.map((node, index) => (
        <NodeRenderer key={index} node={node} />
      ))}
    </div>
  );
}

function NodeRenderer({ node }: { node: JsonModelContent }) {
  if (node.type === 'paragraph') {
    if (!node.content) return <p className="min-h-[1em] mb-2" />;
    return (
      <p className="mb-2">
        {node.content.map((child, i) => (
          <NodeRenderer key={i} node={child} />
        ))}
      </p>
    );
  }

  if (node.type === 'text') {
    let element: React.ReactNode = node.text || '';
    if (node.marks) {
      node.marks.forEach((mark) => {
        if (mark.type === 'strong') element = <strong>{element}</strong>;
        else if (mark.type === 'em') element = <em>{element}</em>;
        else if (mark.type === 'code') element = <code className="bg-muted px-1 py-0.5 rounded text-sm font-mono">{element}</code>;
        else if (mark.type === 'link' && mark.attrs?.href) {
          element = (
            <Link href={mark.attrs.href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline break-all">
              {element}
            </Link>
          );
        }
      });
    }
    return <>{element}</>;
  }

  // UPDATED IMAGE HANDLING
  if (node.type === 'image') {
    const src = node.attrs?.src || node.attrs?.url;

    if (src) {
      return (
        <div className="my-4 rounded-lg overflow-hidden border bg-muted/20 relative max-w-full inline-block">
          <Image
            src={src}
            alt={node.attrs?.alt || 'Post image'}
            width={0}
            height={0}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 800px"
            className="w-auto h-auto max-w-full max-h-150 object-contain mx-auto"
          />
        </div>
      );
    }

    if (node.attrs?.id !== undefined) {
      return (
        <div className="my-4 p-4 rounded-lg border border-dashed bg-muted/30 flex items-center justify-center gap-2 text-muted-foreground">
          <ImageOff className="h-5 w-5" />
          <span className="text-sm">
            Image ID:{node.attrs.id} (Source URL missing from database)
          </span>
        </div>
      );
    }
  }

  if (node.type === 'bulletList') {
    return <ul className="list-disc pl-5 mb-2 space-y-1">{node.content?.map((child, i) => <NodeRenderer key={i} node={child} />)}</ul>;
  }
  if (node.type === 'listItem') {
    return <li>{node.content?.map((child, i) => <NodeRenderer key={i} node={child} />)}</li>;
  }
  if (node.content) {
    return <div>{node.content.map((child, i) => <NodeRenderer key={i} node={child} />)}</div>;
  }

  return null;
}