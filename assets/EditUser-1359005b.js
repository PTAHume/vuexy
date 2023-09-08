import{D as F,C as z,w as e,b as se,B as S,ab as A,r as p,a3 as M,ac as G,Q as ae,s as I}from"./index-9f6d8844.js";import{a as E,g as O,f as te,s as re,A as le}from"./App-f2959991.js";import{u as T,C as v}from"./index.esm-626b9d3a.js";import{C as $}from"./Card-128da412.js";import{C as H}from"./CardBody-d043e87a.js";import{C as Y}from"./CardHeader-fb69c611.js";import{C as J}from"./CardTitle-514b21bc.js";import{F as Q}from"./Form-da08bd07.js";import{F as w}from"./FormFeedback-d5f74e5e.js";import{I as N,L as b}from"./Label-1262359e.js";import{S as ne}from"./react-select.esm-07358c8a.js";import{A as oe,w as ie,S as ce}from"./ext-component-sweet-alerts-f24d0910.js";import{C as me}from"./check-a627512a.js";import"./Fade-197d599b.js";const de=new F,ue=async s=>{try{const r=new FormData;return r.append("id",s.id),r.append("email",s.email),r.append("password",s.password),r.append("name",s.name),r.append("mobile",s.mobile),r.append("status",s.status),s.image&&s.image instanceof File&&r.append("image",s.image),await de.updateAdminUserDetails(r)}catch(r){throw r}},he={confirmCheckbox:!1},k=ie(ce),fe=({id:s})=>{const r=E(),i=z(),d=new F,{control:D,setError:j,handleSubmit:g,formState:{errors:c}}=T({defaultValues:he}),n=async()=>{const h=await k.fire({title:"Are you sure?",text:"Are you sure you would like to deactivate  account?",icon:"warning",showCancelButton:!0,confirmButtonText:"Yes, delete it!",customClass:{confirmButton:"btn btn-primary",cancelButton:"btn btn-danger ms-1"},buttonsStyling:!1});if(h.value)try{r(A(!0)),await d.deleteAdminUser(s),r(A(!1)),k.fire({icon:"success",title:"Deleted!",text:"Account has been deactivated.",customClass:{confirmButton:"btn btn-success"}}),i(O())}catch(U){console.log(U)}else h.dismiss===k.DismissReason.cancel&&k.fire({title:"Cancelled",text:"Deactivation Cancelled!!",icon:"error",customClass:{confirmButton:"btn btn-success"}})},x=h=>{h.confirmCheckbox===!0?n():j("confirmCheckbox",{type:"manual"})};return e.jsxs($,{children:[e.jsx(Y,{className:"border-bottom",children:e.jsx(J,{tag:"h4",children:"Delete Account"})}),e.jsxs(H,{className:"py-2 my-25",children:[e.jsxs(oe,{color:"warning",children:[e.jsx("h4",{className:"alert-heading",children:"Are you sure you want to delete your account?"}),e.jsx("div",{className:"alert-body fw-normal",children:"Once you delete your account, there is no going back. Please be certain."})]}),e.jsxs(Q,{onSubmit:g(x),children:[e.jsxs("div",{className:"form-check",children:[e.jsx(v,{control:D,name:"confirmCheckbox",render:({field:h})=>e.jsx(N,{...h,type:"checkbox",id:"confirmCheckbox",checked:h.value,invalid:c.confirmCheckbox&&!0})}),e.jsx(b,{for:"confirmCheckbox",className:se("form-check-label",{"text-danger":c&&c.confirmCheckbox}),children:"I confirm my account deactivation"}),c&&c.confirmCheckbox&&e.jsx(w,{children:"Please confirm that you want to delete account"})]}),e.jsx("div",{className:"mt-1",children:e.jsx(S,{color:"danger",children:"Deactivate Account"})})]})]})]})},pe=({redux:s})=>{var P,B,R,q,L;const[r,i]=p.useState(!1),d=[{value:1,label:"Active"},{value:0,label:"Inactive"}],[D,j]=p.useState(""),[g,c]=p.useState(null),[n,x]=p.useState(""),h=E(),U=new F,{id:m}=M(),K=a=>{const u=a.target.files;if(u.length>0){c(u[0]);const f=new FileReader;f.onload=function(){x(f.result)},f.readAsDataURL(u[0])}else c(null),x("")},{reset:W,control:C,setError:y,handleSubmit:X,formState:{errors:o}}=T(),Z=()=>{j("")};p.useEffect(()=>{var u,f;const a=n||((u=s.userData[m])!=null&&u.image?`${U.baseurl()}${(f=s.userData[m])==null?void 0:f.image}`:te);j(a)},[(P=s.userData[m])==null?void 0:P.image,n]);const _=async a=>{var f,V;debugger;if(console.log(a.status.value),i(!0),Object.values(a).every(t=>typeof t=="object"&&t!==null||t.length>0)){if(Object.values(a).every(t=>typeof t=="object"&&t!==null||t.length>0)&&(!o||Object.keys(o).length===0))try{const t={id:m,email:a.email,password:a.password,name:a.name,mobile:a.mobile,status:parseInt(a.status.value,10)};g?t.image=g:(f=s.userData[m])!=null&&f.image?t.image=(V=s.userData[m])==null?void 0:V.image:t.image="";const l=await ue(t);l.status===201&&(i(!1),localStorage.setItem("lastUpdated",Date.now()),h(G(l.data)),ae(e.jsxs("div",{className:"d-flex",children:[e.jsx("div",{className:"me-1",children:e.jsx(le,{size:"sm",color:"success",icon:e.jsx(me,{size:12})})}),e.jsxs("div",{className:"d-flex flex-column",children:[e.jsx("h6",{children:"Form Submitted!"}),e.jsx("div",{}),e.jsx("span",{children:"You have successfully updated the User details!"})]})]})))}catch(t){if(i(!1),t.response&&t.response.status===422){const l=t.response.data.errors;l.email?y("email",{type:"manual",message:l.email?l.email:"Incorrect  email"}):l.password?y("password",{type:"manual",message:l.password?l.password:"Incorrect  password"}):l.name?y("name",{type:"manual",message:l.name?l.name:"Incorrect  name"}):l.mobile?y("mobile",{type:"manual",message:l.mobile?l.mobile:"Incorrect  mobile"}):l.status&&y("status",{type:"manual",message:l.status?l.status:"Incorrect  status"})}else console.error("Unexpected error:",t)}}else{for(const t in a)(!a[t]||a[t].length===0)&&y(t,{type:"manual",message:`The ${t} field is required.`});i(!1)}},ee=()=>{W({email:"",mobile:"",password:"",name:""})};return e.jsxs(p.Fragment,{children:[e.jsxs($,{children:[e.jsx(Y,{className:"border-bottom",children:e.jsx(J,{tag:"h4",children:"Edit User Details"})}),e.jsxs(H,{className:"py-2 my-25",children:[e.jsxs("div",{className:"d-flex",children:[e.jsx("div",{className:"me-25",children:e.jsx("img",{className:"rounded me-50",src:D,alt:"Generic placeholder image",height:"70",width:"100"})}),e.jsx("div",{className:"d-flex align-items-end mt-75 ms-1",children:e.jsxs("div",{children:[e.jsxs(S,{tag:b,className:"mb-75 me-75",size:"sm",color:"primary",children:["Upload",e.jsx(N,{type:"file",onChange:K,hidden:!0,accept:"image/*"})]}),e.jsx(S,{className:"mb-75",color:"secondary",size:"sm",outline:!0,onClick:Z,children:"Reset"}),e.jsx("p",{className:"mb-0",children:"Allowed JPG, GIF or PNG. Max size of 800kB"})]})})]}),e.jsxs(Q,{className:"mt-2 pt-50",onSubmit:X(_),children:[e.jsxs("div",{className:"mb-1",children:[e.jsx(b,{className:"form-label",for:"NameAsync",children:"Name"}),e.jsx(v,{defaultValue:((B=s.userData[m])==null?void 0:B.name)||"",control:C,rules:{required:"Name is required"},id:"NameAsync",name:"name",render:({field:a})=>e.jsx(N,{...a,placeholder:"Name",invalid:o.name&&!0})}),o.name&&e.jsx(w,{children:o.name.message})]}),e.jsxs("div",{className:"mb-1",children:[e.jsx(b,{className:"form-label",for:"mobileAsync",children:"Mobile Phone"}),e.jsx(v,{defaultValue:((R=s.userData[m])==null?void 0:R.mobile)||"",control:C,rules:{required:"Mobile is required"},id:"mobileAsync",name:"mobile",render:({field:a})=>e.jsx(N,{...a,placeholder:"Phone",type:"mobile",invalid:o.mobile&&!0})}),o.mobile&&e.jsx(w,{children:o.mobile.message})]}),e.jsxs("div",{className:"mb-1",children:[e.jsx(b,{className:"form-label",for:"emailAsync",children:"Email"}),e.jsx(v,{name:"email",id:"emailAsync",defaultValue:((q=s.userData[m])==null?void 0:q.email)||"",control:C,rules:{required:"Email is required"},render:({field:a})=>e.jsx(N,{...a,type:"email",placeholder:"example@email.com",invalid:o.email&&!0})}),o.email&&e.jsx(w,{children:o.email.message})]}),e.jsxs("div",{className:"mb-1",children:[e.jsx(b,{className:"form-label",for:"passwordAsync",children:"Password"}),e.jsx(v,{defaultValue:((L=s.userData[m])==null?void 0:L.password)||"",control:C,rules:{required:"Password is required"},id:"passwordAsync",name:"password",render:({field:a})=>e.jsx(N,{...a,type:"password",placeholder:"Password",invalid:o.password&&!0})}),o.password&&e.jsx(w,{children:o.password.message})]}),e.jsxs("div",{className:"mb-1",children:[e.jsx(b,{className:"form-label",for:"statusAsync",children:"Status"}),e.jsx(v,{id:"react-select",control:C,name:"status",defaultValue:d.find(a=>{var u;return a.value===(s.userData&&parseInt((u=s.userData[m])==null?void 0:u.status,10))}),z:!0,render:({field:a})=>e.jsx(ne,{options:d,classNamePrefix:"select",theme:re,...a})}),o.status&&e.jsx(w,{children:o.status.message})]}),e.jsxs("div",{className:"d-flex",children:[e.jsx(S,{className:"me-1",color:"primary",disabled:r,type:"submit",children:"Submit"}),e.jsx(S,{outline:!0,color:"secondary",type:"reset",onClick:ee,children:"Reset"})]}),e.jsx("div",{id:"loading-overlay",style:{display:r?"flex":"none"},children:e.jsx("div",{className:"loader"})})]})]})]}),e.jsx(fe,{id:m})]})},xe=({dataVersion:s})=>{const r=z(),{id:i}=M(),d=E(),D=new F,j=I(n=>n.userData.userData[i]),g=I(n=>n.userData.version),c=p.useCallback(async()=>{if(!(j&&g===s))try{d(A(!0));const x=(await D.getAdminUserData(i)).data[0];d(G(x)),d(A(!1))}catch(n){console.log(n),n.response.status===404?r(O()):console.log("Error",n.message),d(A(!1))}},[i,d]);return p.useEffect(()=>{c()},[c]),p.useEffect(()=>{const n=x=>{x.key==="lastUpdated"&&c()};return window.addEventListener("storage",n),()=>{window.removeEventListener("storage",n)}},[c]),null},Ie=()=>{const s=I(i=>i.userData),r=s.loading;return e.jsxs("div",{children:[e.jsx(xe,{dataVersion:s.version,redux:s}),r?e.jsx("div",{id:"loading-overlay",style:{display:"flex"},children:e.jsx("div",{className:"loader"})}):e.jsx(pe,{dataVersion:s.version,redux:s})]})};export{Ie as default};