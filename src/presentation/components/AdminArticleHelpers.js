export const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

export const formatDate = (value) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? 'N/A' : new Intl.DateTimeFormat('vi-VN').format(date);
};

export const createDefaultArticleHandlers = (apiBase, repository) => ({
  onLoadArticles: () => repository.getArticles(),
  onToggleFeatured: (id, state) => repository.toggleArticleFeatured(id, state),
  onDeleteArticle: (id) => repository.deleteArticle(id),
  onUpdateArticle: (id, data) => repository.updateArticle(id, data),
  onSaveArticle: (data) => repository.createArticle(data),
  onUpload: async (file, bucket = 'agent-media') => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch(`${apiBase}/admin/upload?bucket=${bucket}`, { method: 'POST', body: formData });
    const data = await response.json();
    return data.url || data.Url || '';
  }
});
