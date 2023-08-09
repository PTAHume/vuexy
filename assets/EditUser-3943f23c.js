import{a as B,g as G,e as ae,s as te,A as re}from"./App-139cddee.js";import{M as U,L,I as r,k as e,j as le,B as x,am as F,r as b,ad as O,an as T,N as ne,D as P}from"./index-2970b7da.js";import{u as $,C as D}from"./index.esm-a6b77bd8.js";import{C as H}from"./Card-7e997483.js";import{C as Y}from"./CardBody-4863a122.js";import{C as J}from"./CardHeader-5396ff8e.js";import{C as _}from"./CardTitle-506fdd1f.js";import{F as K}from"./Form-af7e54da.js";import{F as C}from"./FormFeedback-a1d23310.js";import{I as S,L as y}from"./Label-c5c65c59.js";import{S as oe}from"./react-select.esm-09f0e9bf.js";import{A as ie,w as ce,S as me}from"./ext-component-sweet-alerts-12c238a6.js";import{C as de}from"./check-5de50022.js";import"./emotion-memoize.esm-f5713a00.js";const ue=new U,he=async s=>{try{const l=new FormData;return l.append("id",s.id),l.append("email",s.email),l.append("password",s.password),l.append("name",s.name),l.append("mobile",s.mobile),l.append("status",s.status),s.image&&s.image instanceof File&&l.append("image",s.image),await ue.updateUser(l)}catch(l){throw l}},fe={confirmCheckbox:!1},I=ce(me),pe=({id:s})=>{const l=B(),c=L(),u=new U,{control:k,setError:v,handleSubmit:w,formState:{errors:m}}=$({defaultValues:fe}),o=async()=>{const f=await I.fire({title:"Are you sure?",text:"Are you sure you would like to deactivate  account?",icon:"warning",showCancelButton:!0,confirmButtonText:"Yes, delete it!",customClass:{confirmButton:"btn btn-primary",cancelButton:"btn btn-danger ms-1"},buttonsStyling:!1});if(f.value)try{l(F(!0)),await u.deleteUser(s),l(F(!1)),I.fire({icon:"success",title:"Deleted!",text:"Account has been deactivated.",customClass:{confirmButton:"btn btn-success"}}),c(G())}catch(E){console.log(E)}else f.dismiss===I.DismissReason.cancel&&I.fire({title:"Cancelled",text:"Deactivation Cancelled!!",icon:"error",customClass:{confirmButton:"btn btn-success"}})};return r(H,{children:[e(J,{className:"border-bottom",children:e(_,{tag:"h4",children:"Delete Account"})}),r(Y,{className:"py-2 my-25",children:[r(ie,{color:"warning",children:[e("h4",{className:"alert-heading",children:"Are you sure you want to delete your account?"}),e("div",{className:"alert-body fw-normal",children:"Once you delete your account, there is no going back. Please be certain."})]}),r(K,{onSubmit:w(f=>{f.confirmCheckbox===!0?o():v("confirmCheckbox",{type:"manual"})}),children:[r("div",{className:"form-check",children:[e(D,{control:k,name:"confirmCheckbox",render:({field:f})=>e(S,{...f,type:"checkbox",id:"confirmCheckbox",checked:f.value,invalid:m.confirmCheckbox&&!0})}),e(y,{for:"confirmCheckbox",className:le("form-check-label",{"text-danger":m&&m.confirmCheckbox}),children:"I confirm my account deactivation"}),m&&m.confirmCheckbox&&e(C,{children:"Please confirm that you want to delete account"})]}),e("div",{className:"mt-1",children:e(x,{color:"danger",children:"Deactivate Account"})})]})]})]})},be=({redux:s})=>{var q,R,j,V,M;const[l,c]=b.useState(!1),u=[{value:1,label:"Active"},{value:0,label:"Inactive"}],[k,v]=b.useState(""),[w,m]=b.useState(null),[o,g]=b.useState("");L();const f=B(),E=new U,{id:d}=O(),Q=a=>{const h=a.target.files;if(h.length>0){m(h[0]);const p=new FileReader;p.onload=function(){g(p.result)},p.readAsDataURL(h[0])}else m(null),g("")},W=()=>{v("")};b.useEffect(()=>{var h,p;const a=o||((h=s.userData[d])!=null&&h.image?`${E.baseurl()}${(p=s.userData[d])==null?void 0:p.image}`:ae);v(a)},[(q=s.userData[d])==null?void 0:q.image,o]);const X=async a=>{var p,z;if(c(!0),Object.values(a).every(t=>typeof t=="object"&&t!==null||t.length>0)){if(Object.values(a).every(t=>typeof t=="object"&&t!==null||t.length>0)&&(!i||Object.keys(i).length===0))try{const t={id:d,email:a.email,password:a.password,name:a.name,mobile:a.mobile,status:parseInt(a.status.value,10)};w?t.image=w:(p=s.userData[d])!=null&&p.image?t.image=(z=s.userData[d])==null?void 0:z.image:t.image="";const n=await he(t);n.status===201&&(c(!1),localStorage.setItem("lastUpdated",Date.now()),f(T(n.data)),ne(r("div",{className:"d-flex",children:[e("div",{className:"me-1",children:e(re,{size:"sm",color:"success",icon:e(de,{size:12})})}),r("div",{className:"d-flex flex-column",children:[e("h6",{children:"Form Submitted!"}),e("div",{}),e("span",{children:"You have successfully updated the User details!"})]})]})))}catch(t){if(c(!1),t.response&&t.response.status===422){const n=t.response.data.errors;n.email?N("email",{type:"manual",message:n.email?n.email:"Incorrect  email"}):n.password?N("password",{type:"manual",message:n.password?n.password:"Incorrect  password"}):n.name?N("name",{type:"manual",message:n.name?n.name:"Incorrect  name"}):n.mobile?N("mobile",{type:"manual",message:n.mobile?n.mobile:"Incorrect  mobile"}):n.status&&N("status",{type:"manual",message:n.status?n.status:"Incorrect  status"})}else console.error("Unexpected error:",t)}}else{for(const t in a)(!a[t]||a[t].length===0)&&N(t,{type:"manual",message:`The ${t} field is required.`});c(!1)}},Z=()=>{ee({email:"",mobile:"",password:"",name:""})},{reset:ee,control:A,setError:N,handleSubmit:se,formState:{errors:i}}=$();return r(b.Fragment,{children:[r(H,{children:[e(J,{className:"border-bottom",children:e(_,{tag:"h4",children:"Edit User Details"})}),r(Y,{className:"py-2 my-25",children:[r("div",{className:"d-flex",children:[e("div",{className:"me-25",children:e("img",{className:"rounded me-50",src:k,alt:"Generic placeholder image",height:"70",width:"100"})}),e("div",{className:"d-flex align-items-end mt-75 ms-1",children:r("div",{children:[r(x,{tag:y,className:"mb-75 me-75",size:"sm",color:"primary",children:["Upload",e(S,{type:"file",onChange:Q,hidden:!0,accept:"image/*"})]}),e(x,{className:"mb-75",color:"secondary",size:"sm",outline:!0,onClick:W,children:"Reset"}),e("p",{className:"mb-0",children:"Allowed JPG, GIF or PNG. Max size of 800kB"})]})})]}),r(K,{className:"mt-2 pt-50",onSubmit:se(X),children:[r("div",{className:"mb-1",children:[e(y,{className:"form-label",for:"NameAsync",children:"Name"}),e(D,{defaultValue:((R=s.userData[d])==null?void 0:R.name)||"",control:A,rules:{required:"Name is required"},id:"NameAsync",name:"name",render:({field:a})=>e(S,{...a,placeholder:"Name",invalid:i.name&&!0})}),i.name&&e(C,{children:i.name.message})]}),r("div",{className:"mb-1",children:[e(y,{className:"form-label",for:"mobileAsync",children:"Mobile Phone"}),e(D,{defaultValue:((j=s.userData[d])==null?void 0:j.mobile)||"",control:A,rules:{required:"Mobile is required"},id:"mobileAsync",name:"mobile",render:({field:a})=>e(S,{...a,placeholder:"Phone",type:"mobile",invalid:i.mobile&&!0})}),i.mobile&&e(C,{children:i.mobile.message})]}),r("div",{className:"mb-1",children:[e(y,{className:"form-label",for:"emailAsync",children:"Email"}),e(D,{name:"email",id:"emailAsync",defaultValue:((V=s.userData[d])==null?void 0:V.email)||"",control:A,rules:{required:"Email is required"},render:({field:a})=>e(S,{...a,type:"email",placeholder:"example@email.com",invalid:i.email&&!0})}),i.email&&e(C,{children:i.email.message})]}),r("div",{className:"mb-1",children:[e(y,{className:"form-label",for:"passwordAsync",children:"Password"}),e(D,{defaultValue:((M=s.userData[d])==null?void 0:M.password)||"",control:A,rules:{required:"Password is required"},id:"passwordAsync",name:"password",render:({field:a})=>e(S,{...a,type:"password",placeholder:"Password",invalid:i.password&&!0})}),i.password&&e(C,{children:i.password.message})]}),r("div",{className:"mb-1",children:[e(y,{className:"form-label",for:"statusAsync",children:"Status"}),e(D,{id:"react-select",control:A,name:"status",defaultValue:u.find(a=>{var h;return a.value===(s.userData&&parseInt((h=s.userData[d])==null?void 0:h.status,10))}),render:({field:a})=>e(oe,{options:u,classNamePrefix:"select",theme:te,...a})}),i.status&&e(C,{children:i.status.message})]}),r("div",{className:"d-flex",children:[e(x,{className:"me-1",color:"primary",disabled:l,type:"submit",children:"Submit"}),e(x,{outline:!0,color:"secondary",type:"reset",onClick:Z,children:"Reset"})]}),e("div",{id:"loading-overlay",style:{display:l?"flex":"none"},children:e("div",{className:"loader"})})]})]})]}),e(pe,{id:d})]})},ge=({dataVersion:s})=>{const l=L(),{id:c}=O(),u=B(),k=new U,v=P(o=>o.userData.userData[c]),w=P(o=>o.userData.version),m=b.useCallback(async()=>{if(!(v&&w===s))try{u(F(!0));const g=(await k.getuserData(c)).data[0];u(T(g)),u(F(!1))}catch(o){console.log(o),o.response.status===404?l(G()):console.log("Error",o.message),u(F(!1))}},[c,u]);return b.useEffect(()=>{m()},[m]),b.useEffect(()=>{const o=g=>{g.key==="lastUpdated"&&m()};return window.addEventListener("storage",o),()=>{window.removeEventListener("storage",o)}},[m]),null},Pe=()=>{const s=P(c=>c.userData),l=s.loading;return r("div",{children:[e(ge,{dataVersion:s.version,redux:s}),l?e("div",{id:"loading-overlay",style:{display:"flex"},children:e("div",{className:"loader"})}):e(be,{dataVersion:s.version,redux:s})]})};export{Pe as default};