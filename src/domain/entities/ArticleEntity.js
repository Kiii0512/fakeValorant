export class ArticleEntity {
  constructor({
    id,
    title,
    subtitle,
    author,
    mainImageUrl,
    subImageUrl,
    content,
    publishedAt,
    isFeatured = false // Thêm trường này
  }) {
    this.id = id;
    this.title = title;
    this.subtitle = subtitle;
    this.author = author;
    this.mainImageUrl = mainImageUrl;
    this.subImageUrl = subImageUrl;
    this.content = content;
    this.publishedAt = publishedAt;
    this.isFeatured = Boolean(isFeatured); // Thêm trường này
  }
}