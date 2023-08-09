import{a as L,g as G,e as te,s as ne,A as re}from"./App-481512d6.js";import{M as E,L as q,I as r,k as e,j as ie,B as x,ac as F,r as y,ad as O,ae as $,N as le,D as B}from"./index-b7a4e555.js";import{u as Y,C as w}from"./index.esm-18de24ee.js";import{C as H}from"./Card-a28cb4d9.js";import{C as J}from"./CardBody-0550c9c9.js";import{C as _}from"./CardHeader-c56c7988.js";import{C as K}from"./CardTitle-29800001.js";import{F as Q}from"./Form-4df23be0.js";import{F as N}from"./FormFeedback-ef70730d.js";import{I as D,L as b}from"./Label-bb2339a8.js";import{S as oe}from"./react-select.esm-55069274.js";import{A as ce,w as me,S as de}from"./ext-component-sweet-alerts-74f8ba72.js";import{C as ue}from"./check-f0d8f5b6.js";import"./emotion-memoize.esm-f5713a00.js";const pe=new E,he=async a=>{try{const i=new FormData;return i.append("id",a.id),i.append("email",a.email),i.append("password",a.password),i.append("type",a.type),i.append("name",a.name),i.append("mobile",a.mobile),i.append("status",a.status),a.image&&a.image instanceof File&&i.append("image",a.image),await pe.updateAdmin(i)}catch(i){throw i}},fe={confirmCheckbox:!1},I=me(de),ye=({id:a})=>{const i=L(),c=q(),u=new E,{control:k,setError:A,handleSubmit:C,formState:{errors:m}}=Y({defaultValues:fe}),o=async()=>{const h=await I.fire({title:"Are you sure?",text:"Are you sure you would like to deactivate your account?",icon:"warning",showCancelButton:!0,confirmButtonText:"Yes, delete it!",customClass:{confirmButton:"btn btn-primary",cancelButton:"btn btn-danger ms-1"},buttonsStyling:!1});if(h.value)try{i(F(!0)),await u.deleteAdmin(a),i(F(!1)),I.fire({icon:"success",title:"Deleted!",text:"Your account has been deactivated.",customClass:{confirmButton:"btn btn-success"}}),c(G())}catch(P){console.log(P)}else h.dismiss===I.DismissReason.cancel&&I.fire({title:"Cancelled",text:"Deactivation Cancelled!!",icon:"error",customClass:{confirmButton:"btn btn-success"}})};return r(H,{children:[e(_,{className:"border-bottom",children:e(K,{tag:"h4",children:"Delete Account"})}),r(J,{className:"py-2 my-25",children:[r(ce,{color:"warning",children:[e("h4",{className:"alert-heading",children:"Are you sure you want to delete your account?"}),e("div",{className:"alert-body fw-normal",children:"Once you delete your account, there is no going back. Please be certain."})]}),r(Q,{onSubmit:C(h=>{h.confirmCheckbox===!0?o():A("confirmCheckbox",{type:"manual"})}),children:[r("div",{className:"form-check",children:[e(w,{control:k,name:"confirmCheckbox",render:({field:h})=>e(D,{...h,type:"checkbox",id:"confirmCheckbox",checked:h.value,invalid:m.confirmCheckbox&&!0})}),e(b,{for:"confirmCheckbox",className:ie("form-check-label",{"text-danger":m&&m.confirmCheckbox}),children:"I confirm my account deactivation"}),m&&m.confirmCheckbox&&e(N,{children:"Please confirm that you want to delete account"})]}),e("div",{className:"mt-1",children:e(x,{color:"danger",children:"Deactivate Account"})})]})]})]})},ge=({redux:a})=>{var R,U,V,j,M,z;const[i,c]=y.useState(!1),u=[{value:1,label:"Active"},{value:0,label:"Inactive"}],[k,A]=y.useState(""),[C,m]=y.useState(null),[o,v]=y.useState("");q();const h=L(),P=new E,{id:d}=O(),W=s=>{const p=s.target.files;if(p.length>0){m(p[0]);const f=new FileReader;f.onload=function(){v(f.result)},f.readAsDataURL(p[0])}else m(null),v("")},X=()=>{A("")};y.useEffect(()=>{var p,f;const s=o||((p=a.adminData[d])!=null&&p.image?`${P.baseurl()}${(f=a.adminData[d])==null?void 0:f.image}`:te);A(s)},[(R=a.adminData[d])==null?void 0:R.image,o]);const Z=async s=>{var f,T;if(c(!0),Object.values(s).every(n=>typeof n=="object"&&n!==null||n.length>0)){if(Object.values(s).every(n=>typeof n=="object"&&n!==null||n.length>0)&&(!l||Object.keys(l).length===0))try{const n={id:d,email:s.email,password:s.password,type:s.type,name:s.name,mobile:s.mobile,status:parseInt(s.status.value,10)};C?n.image=C:(f=a.adminData[d])!=null&&f.image?n.image=(T=a.adminData[d])==null?void 0:T.image:n.image="";const t=await he(n);t.status===201&&(c(!1),localStorage.setItem("lastUpdated",Date.now()),h($(t.data)),le(r("div",{className:"d-flex",children:[e("div",{className:"me-1",children:e(re,{size:"sm",color:"success",icon:e(ue,{size:12})})}),r("div",{className:"d-flex flex-column",children:[e("h6",{children:"Form Submitted!"}),e("div",{}),e("span",{children:"You have successfully updated the Admin details!"})]})]})))}catch(n){if(c(!1),n.response&&n.response.status===422){const t=n.response.data.errors;t.email?g("email",{type:"manual",message:t.email?t.email:"Incorrect correct email"}):t.password?g("password",{type:"manual",message:t.password?t.password:"Incorrect correct password"}):t.name?g("name",{type:"manual",message:t.name?t.name:"Incorrect correct name"}):t.type?g("type",{type:"manual",message:t.type?t.type:"Incorrect correct type"}):t.mobile?g("mobile",{type:"manual",message:t.mobile?t.mobile:"Incorrect correct mobile"}):t.status?g("status",{type:"manual",message:t.status?t.status:"Incorrect correct status"}):t.image&&g("image",{type:"manual",message:t.image?t.image:"Incorrect image"})}else console.error("Unexpected error:",n)}}else{for(const n in s)(!s[n]||s[n].length===0)&&g(n,{type:"manual",message:`The ${n} field is required.`});c(!1)}},ee=()=>{ae({email:"",mobile:"",password:"",name:""})},{reset:ae,control:S,setError:g,handleSubmit:se,formState:{errors:l}}=Y();return r(y.Fragment,{children:[r(H,{children:[e(_,{className:"border-bottom",children:e(K,{tag:"h4",children:"Edit Admin Details"})}),r(J,{className:"py-2 my-25",children:[r("div",{className:"d-flex",children:[e("div",{className:"me-25",children:e("img",{className:"rounded me-50",src:k,alt:"Generic placeholder image",height:"70",width:"100"})}),e("div",{className:"d-flex align-items-end mt-75 ms-1",children:r("div",{children:[r(x,{tag:b,className:"mb-75 me-75",size:"sm",color:"primary",children:["Upload",e(D,{type:"file",onChange:W,hidden:!0,accept:"image/*"})]}),e(x,{className:"mb-75",color:"secondary",size:"sm",outline:!0,onClick:X,children:"Reset"}),e("p",{className:"mb-0",children:"Allowed JPG, GIF or PNG. Max size of 800kB"}),l.image&&e("span",{className:"text-danger",children:l.image.message})]})})]}),r(Q,{className:"mt-2 pt-50",onSubmit:se(Z),children:[r("div",{className:"mb-1",children:[e(b,{className:"form-label",for:"NameAsync",children:"Name"}),e(w,{defaultValue:((U=a.adminData[d])==null?void 0:U.name)||"",control:S,rules:{required:"Name is required"},id:"NameAsync",name:"name",render:({field:s})=>e(D,{...s,placeholder:"Name",invalid:l.name&&!0})}),l.name&&e(N,{children:l.name.message})]}),r("div",{className:"mb-1",children:[e(b,{className:"form-label",for:"mobileAsync",children:"Mobile Phone"}),e(w,{defaultValue:((V=a.adminData[d])==null?void 0:V.mobile)||"",control:S,rules:{required:"Mobile is required"},id:"mobileAsync",name:"mobile",render:({field:s})=>e(D,{...s,placeholder:"Phone",type:"mobile",invalid:l.mobile&&!0})}),l.mobile&&e(N,{children:l.mobile.message})]}),r("div",{className:"mb-1",children:[e(b,{className:"form-label",for:"emailAsync",children:"Email"}),e(w,{name:"email",id:"emailAsync",defaultValue:((j=a.adminData[d])==null?void 0:j.email)||"",control:S,rules:{required:"Email is required"},render:({field:s})=>e(D,{...s,type:"email",placeholder:"example@email.com",invalid:l.email&&!0})}),l.email&&e(N,{children:l.email.message})]}),r("div",{className:"mb-1",children:[e(b,{className:"form-label",for:"passwordAsync",children:"Password"}),e(w,{defaultValue:((M=a.adminData[d])==null?void 0:M.password)||"",control:S,rules:{required:"Password is required"},id:"passwordAsync",name:"password",render:({field:s})=>e(D,{...s,type:"password",placeholder:"Password",invalid:l.password&&!0})}),l.password&&e(N,{children:l.password.message})]}),r("div",{className:"mb-1",children:[e(b,{className:"form-label",for:"typeAsync",children:"Admin Type"}),e(w,{defaultValue:((z=a.adminData[d])==null?void 0:z.type)||"",control:S,id:"typeAsync",name:"type",render:({field:s})=>e(D,{...s,type:"text",placeholder:"type",invalid:l.type&&!0})}),l.type&&e(N,{children:l.type.message})]}),r("div",{className:"mb-1",children:[e(b,{className:"form-label",for:"statusAsync",children:"Status"}),e(w,{id:"react-select",control:S,name:"status",defaultValue:u.find(s=>{var p;return s.value===(a.adminData&&parseInt((p=a.adminData[d])==null?void 0:p.status,10))}),render:({field:s})=>e(oe,{options:u,classNamePrefix:"select",theme:ne,...s})}),l.status&&e(N,{children:l.status.message})]}),r("div",{className:"d-flex",children:[e(x,{className:"me-1",color:"primary",disabled:i,type:"submit",children:"Submit"}),e(x,{outline:!0,color:"secondary",type:"reset",onClick:ee,children:"Reset"})]}),e("div",{id:"loading-overlay",style:{display:i?"flex":"none"},children:e("div",{className:"loader"})})]})]})]}),e(ye,{id:d})]})},be=({dataVersion:a})=>{const i=q(),{id:c}=O(),u=L(),k=new E,A=B(o=>o.adminData.adminData[c]),C=B(o=>o.adminData.version),m=y.useCallback(async()=>{if(!(A&&C===a))try{u(F(!0));const v=(await k.getAdminData(c)).data[0];u($(v)),u(F(!1))}catch(o){console.log(o),o.response.status===404?i(G()):console.log("Error",o.message),u(F(!1))}},[c,u]);return y.useEffect(()=>{m()},[m]),y.useEffect(()=>{const o=v=>{v.key==="lastUpdated"&&m()};return window.addEventListener("storage",o),()=>{window.removeEventListener("storage",o)}},[m]),null},Le=()=>{const a=B(c=>c.adminData),i=a.loading;return r("div",{children:[e(be,{dataVersion:a.version,redux:a}),i?e("div",{id:"loading-overlay",style:{display:"flex"},children:e("div",{className:"loader"})}):e(ge,{dataVersion:a.version,redux:a})]})};export{Le as default};
