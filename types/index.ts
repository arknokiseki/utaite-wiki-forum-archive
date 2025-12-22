// ============================================
// Database Entity Types
// ============================================

export interface User {
  id: string;
  name: string;
  avatar_url: string | null;
  badge_permission: string | null;
}

export interface Forum {
  id: string;
  site_id: number;
  name: string;
  description: string | null;
  allows_threads: boolean;
  display_order: number;
  parent_id: string | null;
  image_url: string | null;
  is_deleted: boolean;
  is_editable: boolean;
  is_locked: boolean;
  creation_epoch_seconds: number;
  creator_id: string | null;
  thread_count: number;
  post_count: number;
}

export interface DiscussionThread {
  id: string;
  site_id: number;
  forum_id: string;
  first_post_id: string | null;
  last_post_id: string | null;
  title: string | null;
  funnel: string | null;
  created_epoch_seconds: number;
  modified_epoch_seconds: number;
  created_by: string | null;
  last_edited_by: string | null;
  post_count: number;
  raw_content: string | null;
  rendered_content: string | null;
  json_model: string | null;
  upvote_count: number;
  is_deleted: boolean;
  is_locked: boolean;
  tags_json: string | null;
}

export interface DiscussionPost {
  id: string;
  thread_id: string;
  parent_id: string | null;
  position: number;
  created_epoch_seconds: number;
  creator_id: string | null;
  title: string | null;
  raw_content: string | null;
  rendered_content: string | null;
  json_model: string | null;
  upvote_count: number;
  is_deleted: boolean;
  is_reported: boolean;
}

export interface ThreadTag {
  thread_id: string;
  tag: string;
}

export interface Poll {
  id: number;
  thread_id: string;
  question: string | null;
  total_votes: number;
}

export interface PollAnswer {
  id: number;
  poll_id: number;
  text: string | null;
  position: number;
  votes: number;
  image_url: string | null;
}

export interface ArticleCommentThread {
  id: string;
  article_title: string;
  first_post_id: string | null;
}

export interface ArticleCommentPost {
  id: string;
  thread_id: string;
  article_title: string;
  parent_id: string | null;
  created_epoch_seconds: number;
  creator_id: string | null;
  raw_content: string | null;
  json_model: string | null;
  upvote_count: number;
}

// ============================================
// Extended Types (with joins)
// ============================================

export interface ThreadWithAuthor extends DiscussionThread {
  author_name: string | null;
  author_avatar: string | null;
  forum_name: string | null;
}

export interface PostWithAuthor extends DiscussionPost {
  author_name: string | null;
  author_avatar: string | null;
  author_badge: string | null;
}

export interface PollWithAnswers extends Poll {
  answers: PollAnswer[];
  thread_title?: string | null;
}

export interface ForumWithStats extends Forum {
  recent_activity: string | null;
}

export interface UserWithStats extends User {
  thread_count: number;
  post_count: number;
  total_upvotes: number;
}

// ============================================
// JSON Model Types (for rich content)
// ============================================

export interface JsonModelMark {
  type: 'link' | 'strong' | 'em' | 'code';
  attrs?: {
    href?: string;
    title?: string | null;
  };
}

export interface JsonModelContent {
  type: 'text' | 'paragraph' | 'image' | 'openGraph' | 'bulletList' | 'listItem';
  text?: string;
  marks?: JsonModelMark[];
  attrs?: {
    id?: number;
    url?: string;
    src?: string;
    alt?: string;
  };
  content?: JsonModelContent[];
}

export interface JsonModel {
  type: 'doc';
  content: JsonModelContent[];
}

// ============================================
// Tag Types
// ============================================

export interface ParsedTag {
  siteId: string;
  articleId: string;
  articleTitle: string;
  relativeUrl: string;
  image: string | null;
}

// ============================================
// API Response Types
// ============================================

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface StatsResponse {
  totalUsers: number;
  totalThreads: number;
  totalPosts: number;
  totalForums: number;
  totalPolls: number;
  dateRange: {
    earliest: string;
    latest: string;
  };
  topArtists: { name: string; count: number }[];
  topUsers: { id: string; name: string; avatar: string | null; posts: number }[];
  recentThreads: ThreadWithAuthor[];
}

export interface SearchResult {
  type: 'thread' | 'post' | 'user';
  id: string;
  title: string;
  content: string | null;
  author: string | null;
  created_at: number;
  relevance: number;
}