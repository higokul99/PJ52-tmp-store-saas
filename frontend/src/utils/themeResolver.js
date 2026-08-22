export function resolveStoreTheme(storeData) {
  if (!storeData) return 'theme-default';

  const cat = String(storeData.category || '').toLowerCase();
  const name = String(storeData.name || '').toLowerCase();
  const sub = String(storeData.subdomain || '').toLowerCase();

  const isMatch = (keywords) => keywords.some(k => cat.includes(k) || name.includes(k) || sub.includes(k));

  if (isMatch(['jewelry', 'jewellery', 'gem', 'diamond'])) {
    return 'theme-jewelry';
  }
  if (isMatch(['beauty', 'cosmetic', 'makeup', 'skincare'])) {
    return 'theme-beauty';
  }
  if (isMatch(['home', 'living', 'furniture', 'decor'])) {
    return 'theme-home';
  }
  if (isMatch(['electronics', 'tech', 'gadget', 'mobile'])) {
    return 'theme-electronics';
  }
  if (isMatch(['footwear', 'shoe', 'sneaker', 'kicks'])) {
    return 'theme-footwear';
  }
  if (isMatch(['grocery', 'food', 'supermarket', 'mart', 'fresh'])) {
    return 'theme-grocery';
  }
  if (isMatch(['gift', 'present', 'surprise'])) {
    return 'theme-gift';
  }
  if (isMatch(['fashion', 'apparel', 'clothing', 'sree-x'])) {
    return 'theme-eflyer'; 
  }

  return 'theme-default';
}
