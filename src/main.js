import { createClient } from '@supabase/supabase-js'
import './style.css'
const SUPABASE_URL='https://jkialjidrfbadljudtaq.supabase.co'
const PUBLISHABLE_KEY='sb_publishable_nPv3ZL1BEPTIR_UVf0gneg_IY4NEvWi'
const supabase=createClient(SUPABASE_URL,PUBLISHABLE_KEY,{auth:{detectSessionInUrl:true,persistSession:true,flowType:'implicit'}})
const app=document.querySelector('#app')
const status=(m)=>{document.querySelector('#result').textContent=m}
async function callHost(){
 const {data,error}=await supabase.auth.getSession()
 if(error||!data.session){status('Authentication did not complete.');return}
 status('Authenticated. Proving controlled ingress…')
 const out=await fetch(SUPABASE_URL+'/functions/v1/rubi-owned-host',{method:'POST',headers:{Authorization:'Bearer '+data.session.access_token,apikey:PUBLISHABLE_KEY,'Content-Type':'application/json'},body:JSON.stringify({request:'RUBI CONTROLLED INGRESS PROOF',workstream:'RUBI_CORE'})})
 const body=await out.json().catch(()=>({status:out.status}))
 status(out.ok?'CONTROLLED INGRESS PROVEN\n'+JSON.stringify(body,null,2):'Ingress blocked\n'+JSON.stringify(body,null,2))
}
function render(){
 app.innerHTML=`<main><section><p class="eyebrow">CONTROLLED INGRESS</p><h1>RUBI Core</h1><p id="state">Authenticate once. RUBI will run the ingress proof automatically after the secure link returns.</p><form id="login"><input id="email" type="email" autocomplete="email" placeholder="Email address" required><button>Send secure sign-in link</button></form><pre id="result"></pre></section></main>`
 document.querySelector('#login').onsubmit=async e=>{e.preventDefault();status('Sending secure sign-in link…');const email=document.querySelector('#email').value;const {error}=await supabase.auth.signInWithOtp({email,options:{emailRedirectTo:'https://rubi-core.onrender.com'}});status(error?error.message:'Secure link sent. Open it on this device; RUBI will continue automatically.')}
}
render()
const {data}=await supabase.auth.getSession()
if(data.session){document.querySelector('#login').hidden=true;await callHost()}
supabase.auth.onAuthStateChange(async(event,session)=>{if(session&&(event==='SIGNED_IN'||event==='TOKEN_REFRESHED')){document.querySelector('#login').hidden=true;await callHost()}})
