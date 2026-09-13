export const bindMainImage = (component) => {
  const container = component.querySelector('[data-image-field="main"]');
  const picker = container.querySelector('[data-picker]');
  const input = container.querySelector('.admin-image-picker__input');
  input.addEventListener('change', () => setMainImageFile(component, input.files[0]));
  picker.addEventListener('dragover', (event) => { event.preventDefault(); picker.classList.add('is-dragging'); });
  picker.addEventListener('dragleave', () => picker.classList.remove('is-dragging'));
  picker.addEventListener('drop', (event) => {
    event.preventDefault();
    picker.classList.remove('is-dragging');
    setMainImageFile(component, event.dataTransfer.files[0]);
  });
  container.querySelector('[data-remove-image]').addEventListener('click', (event) => {
    event.stopPropagation();
    clearMainImage(component);
  });
};

export const setMainImageFile = (component, file) => {
  if (!file) return;
  if (!file.type.startsWith('image/')) {
    component.setStatus('Chỉ hỗ trợ file ảnh PNG, JPG hoặc WEBP.', true);
    return;
  }
  if (component._mainImageState.previewUrl.startsWith('blob:')) URL.revokeObjectURL(component._mainImageState.previewUrl);
  component._mainImageState = { file, previewUrl: URL.createObjectURL(file) };
  updateMainImagePreview(component, component._mainImageState.previewUrl);
};

export const setExistingMainImage = (component, url) => {
  if (!url) return;
  component._mainImageState = { file: null, previewUrl: url };
  updateMainImagePreview(component, url);
};

export const clearMainImage = (component) => {
  if (component._mainImageState.previewUrl.startsWith('blob:')) URL.revokeObjectURL(component._mainImageState.previewUrl);
  component._mainImageState = { file: null, previewUrl: '' };
  const container = component.querySelector('[data-image-field="main"]');
  container.querySelector('.admin-image-picker__input').value = '';
  const preview = container.querySelector('.admin-image-picker__preview');
  preview.hidden = true;
  preview.querySelector('img').src = '';
  container.querySelector('.admin-image-picker__empty').hidden = false;
  container.querySelector('[data-picker]').classList.remove('has-preview');
};

const updateMainImagePreview = (component, source) => {
  const container = component.querySelector('[data-image-field="main"]');
  const picker = container.querySelector('[data-picker]');
  const preview = container.querySelector('.admin-image-picker__preview');
  preview.querySelector('img').src = source;
  preview.hidden = false;
  container.querySelector('.admin-image-picker__empty').hidden = true;
  picker.classList.add('has-preview');
};

export const bindSubImagesContainer = (component) => {
  const subContainer = component.querySelector('#sub-images-container');
  component.querySelector('#add-sub-image-btn').onclick = () => {
    const count = subContainer.querySelectorAll('.sub-image-row').length + 1;
    const row = document.createElement('div');
    row.className = 'sub-image-row';
    row.style.cssText = 'display: flex; gap: 10px; align-items: center; background: var(--panel-light, #141721); padding: 10px 14px; border: 1px solid var(--line, #28344e);';
    row.innerHTML = `<span class="sub-image-index" style="color: var(--cyan, #00f5d4); font-family: var(--mono, monospace); font-size: 11px; min-width: 80px;">ẢNH PHỤ #${count}</span><input type="file" class="single-sub-file" accept="image/*" style="flex: 1;" /><button type="button" class="remove-sub-img-btn" style="background: transparent; border: 1px solid rgba(255,100,112,0.4); color: #ff6470; font-family: var(--mono, monospace); font-size: 10px; padding: 8px 12px; cursor: pointer;">XÓA</button>`;
    subContainer.appendChild(row);
  };
  subContainer.addEventListener('click', (event) => {
    const removeButton = event.target.closest('.remove-sub-img-btn');
    if (!removeButton) return;
    removeButton.closest('.sub-image-row').remove();
    renumberSubImages(component);
  });
};

export const renderExistingSubImages = (component) => {
  const subContainer = component.querySelector('#sub-images-container');
  subContainer.innerHTML = '';
  component._existingSubImages.forEach((url, index) => {
    const row = document.createElement('div');
    row.className = 'sub-image-row existing-sub-row';
    row.style.cssText = 'display: flex; gap: 10px; align-items: center; background: var(--panel-light, #141721); padding: 10px 14px; border: 1px solid var(--line, #28344e);';
    row.innerHTML = `<span class="sub-image-index" style="color: var(--cyan, #00f5d4); font-family: var(--mono, monospace); font-size: 11px; min-width: 80px;">ẢNH CŨ #${index + 1}</span><a href="${url}" target="_blank" style="color:#fff; font-size:11px; flex:1; text-decoration:underline; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${url}</a><button type="button" class="remove-existing-sub-btn" data-url="${url}" style="background: transparent; border: 1px solid rgba(255,100,112,0.4); color: #ff6470; font-family: var(--mono, monospace); font-size: 10px; padding: 8px 12px; cursor: pointer;">XÓA</button>`;
    subContainer.appendChild(row);
  });
  subContainer.querySelectorAll('.remove-existing-sub-btn').forEach((button) => {
    button.onclick = () => {
      component._existingSubImages = component._existingSubImages.filter((url) => url !== button.dataset.url);
      button.closest('.existing-sub-row').remove();
    };
  });
};

const renumberSubImages = (component) => {
  component.querySelectorAll('.sub-image-row').forEach((row, index) => {
    const label = row.querySelector('.sub-image-index');
    if (label) label.textContent = `ẢNH PHỤ #${index + 1}`;
  });
};
