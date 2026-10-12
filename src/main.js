import { createClient } from '@supabase/supabase-js'
import './style.css'

const SUPABASE_URL='https://jkialjidrfbadljudtaq.supabase.co'
const PUBLISHABLE_KEY='sb_publishable_nPv3ZL1BEPTIR_UVf0gneg_IY4NEvWi'
const app=document.querySelector('#app')
const supabase=createClient(SUPABASE_URL,PUBLISHABLE_KEY,{auth:{detectSessionInUrl:true,persistSession:true}})

function render(msg='Authenticate to enter the controlled RUBI execution route.'){
 app.innerHTML=`<main><section><p class="eyebrow">CONTROLLED INGRESS</p><h1>RUBI Core</h1><p>${msg}</p><form id="login"><input id="email" type="email" autocomplete="email" placeholder="Email address" required><button>Send secure sign-in link</button></form><button id="enter" hidden>Enter RUBI Controlled Host</button><pre id="result"></pre></section></main>`
 document.querySelector('#login').onsubmit=login
 document.querySelector('#enter').onclick=enter
}
async function login(e){e.preventDefault();const email=document.querySelector('#email').value;const {error}=await supabase.auth.signInWithOtp({email,options:{emailRedirectTo:location.origin}});document.querySelector('#result').textContent=error?error.message:'Check your email for the secure sign-in link.'}
async function enter(){const {data}=await supabase.auth.getSession();const token=data.session?.access_token;if(!token)return render('Session missing. Authenticate again.');const out=await fetch(SUPABASE_URL+'/functions/v1/rubi-owned-host',{method:'POST',headers:{Authorization:'Bearer '+token,'apikey':PUBLISHABLE_KEY,'Content-Type':'application/json'},body:JSON.stringify({request:'RUBI CONTROLLED INGRESS PROOF',workstream:'RUBI_CORE'})});const body=await out.json().catch(()=>({status:out.status}));document.querySelector('#result').textContent=JSON.stringify(body,null,2)}
render()
const {data}=await supabase.auth.getSession();if(data.session){document.querySelector('#login').hidden=true;document.querySelector('#enter').hidden=false;document.querySelector('section>p:nth-of-type(2)').textContent='Authenticated. Controlled ingress is ready.'}
