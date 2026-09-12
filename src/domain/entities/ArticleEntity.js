export class ArticleEntity {
  constructor({ id, title, excerpt, category, publishedAt, readTime, imageUrl, featured = false }) {
    this.id = id;
    this.title = title;
    this.excerpt = excerpt;
    this.category = category;
    this.publishedAt = publishedAt;
    this.readTime = readTime;
    this.imageUrl = imageUrl;
    this.featured = featured;
  }
}
