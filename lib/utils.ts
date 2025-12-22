import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { formatDistanceToNow, format } from 'date-fns';
import type { JsonModel, JsonModelContent, ParsedTag } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRelativeTime(epochSeconds: number): string {
  const date = new Date(epochSeconds * 1000);
  return formatDistanceToNow(date, { addSuffix: true });
}

export function formatDate(epochSeconds: number): string {
  const date = new Date(epochSeconds * 1000);
  return format(date, 'MMM d, yyyy');
}

export function formatDateTime(epochSeconds: number): string {
  const date = new Date(epochSeconds * 1000);
  return format(date, 'MMM d, yyyy \'at\' h:mm a');
}

export function extractTextFromJsonModel(jsonModel: string | null): string {
  if (!jsonModel) return '';

  try {
    const parsed: JsonModel = JSON.parse(jsonModel);
    return extractTextFromContent(parsed.content);
  } catch {
    return '';
  }
}

function extractTextFromContent(content: JsonModelContent[]): string {
  const texts: string[] = [];

  for (const node of content) {
    if (node.type === 'text' && node.text) {
      texts.push(node.text);
    }
    if (node.content) {
      texts.push(extractTextFromContent(node.content));
    }
  }

  return texts.join(' ').trim();
}

export function parseTagsJson(tagsJson: string | null): ParsedTag[] {
  if (!tagsJson) return [];

  try {
    const parsed = JSON.parse(tagsJson);
    if (Array.isArray(parsed)) {
      return parsed as ParsedTag[];
    }
    return [];
  } catch {
    return [];
  }
}

export function parseTag(tagString: string): ParsedTag | null {
  try {
    return JSON.parse(tagString) as ParsedTag;
  } catch {
    return null;
  }
}

export function getBadgeInfo(badge: string | null): {
  label: string;
  color: string;
} {
  if (!badge) return { label: '', color: '' };

  const badges: Record<string, { label: string; color: string }> = {
    'badge:sysop': { label: 'Admin', color: 'bg-red-500' },
    'badge:staff': { label: 'Staff', color: 'bg-purple-500' },
    'badge:threadmoderator': { label: 'Moderator', color: 'bg-blue-500' },
    'badge:content-moderator': { label: 'Content Mod', color: 'bg-green-500' },
    'badge:soap': { label: 'SOAP', color: 'bg-yellow-500' },
  };

  return badges[badge] || { label: badge.replace('badge:', ''), color: 'bg-gray-500' };
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

export function getAvatarUrl(url: string | null): string {
  if (!url) return '/placeholder-avatar.svg';
  if (url.startsWith('http')) return url;
  return `https://static.wikia.nocookie.net/${url}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}