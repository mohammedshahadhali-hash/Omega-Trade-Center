const OMEGA_DB_READY = window.OMEGA_SUPABASE_URL &&
  !window.OMEGA_SUPABASE_URL.includes('YOUR_') &&
  window.OMEGA_SUPABASE_ANON_KEY &&
  !window.OMEGA_SUPABASE_ANON_KEY.includes('YOUR_');

let omegaSupabase = null;
if (OMEGA_DB_READY && window.supabase) {
  omegaSupabase = window.supabase.createClient(window.OMEGA_SUPABASE_URL, window.OMEGA_SUPABASE_ANON_KEY);
}

const omegaDefaults = [
  {id:'default-1',name:'1.8L Rice Cooker',category:'Rice Cookers',description:'Product description will be added later.',image:'https://placehold.co/800x800/f1f2f4/555?text=Product+Photo'},
  {id:'default-2',name:'Stand Fan',category:'Fans',description:'Product description will be added later.',image:'https://placehold.co/800x800/f1f2f4/555?text=Product+Photo'},
  {id:'default-3',name:'Mixer Grinder',category:'Blenders & Grinders',description:'Product description will be added later.',image:'https://placehold.co/800x800/f1f2f4/555?text=Product+Photo'},
  {id:'default-4',name:'4 Burner Gas Cooker',category:'Gas Cookers',description:'Product description will be added later.',image:'https://placehold.co/800x800/f1f2f4/555?text=Product+Photo'}
];

async function omegaLoadProducts(){
  if(!omegaSupabase) return omegaDefaults;
  const {data,error}=await omegaSupabase.from('products').select('*').order('created_at',{ascending:false});
  if(error) throw error;
  return data || [];
}

async function omegaUploadImage(file){
  const ext=(file.name.split('.').pop()||'jpg').toLowerCase().replace(/[^a-z0-9]/g,'') || 'jpg';
  const path=`products/${Date.now()}-${crypto.randomUUID()}.${ext}`;
  const {error}=await omegaSupabase.storage.from('product-images').upload(path,file,{cacheControl:'3600',upsert:false,contentType:file.type||'image/jpeg'});
  if(error) throw error;
  const {data}=omegaSupabase.storage.from('product-images').getPublicUrl(path);
  return {url:data.publicUrl,path};
}

async function omegaAddProduct(product){
  const {data,error}=await omegaSupabase.from('products').insert(product).select().single();
  if(error) throw error;
  return data;
}

async function omegaDeleteProduct(product){
  const {error}=await omegaSupabase.from('products').delete().eq('id',product.id);
  if(error) throw error;
  if(product.image_path){
    await omegaSupabase.storage.from('product-images').remove([product.image_path]);
  }
}
