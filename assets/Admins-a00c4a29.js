import{D as k,a0 as Y,a1 as Z,w as e,L,r as d,E as R,B as S}from"./index-f8d683b9.js";import{A as ee,E as se,M as ae,a as te,b as ne,B as re,D as ie,S as le,P as oe,c as ce,Q as de,C as me,R as ue}from"./index.es-49cd779a.js";import{A as D,U as he,D as I,b as M,c as N,F as U,d as pe,M as xe,X as je,a as ge,P as fe,e as Ce,i as be}from"./App-7f42e349.js";import{I as j,L as g}from"./Label-5812d02b.js";import{M as Ne,T as we,E as ye}from"./echo-23ad983f.js";import{F as ve}from"./flatpickr-672a56f0.js";import{I as C,a as b}from"./InputGroupText-cedeb045.js";import{C as ke,U as Le}from"./calendar-133048dc.js";import"./pusher-ef6f9223.js";import{R as Se,C as De}from"./Col-5df62ccc.js";import{C as Ae}from"./Card-6aeb9549.js";import{C as Pe}from"./CardHeader-717cfcfb.js";import{C as Ee}from"./CardTitle-32f880ea.js";import{C as ze}from"./check-0af40177.js";const Te=new k,We=Y("admin/updateAdminStatus",async({adminId:o,status:r},{dispatch:s})=>{try{return await Te.updateAdminStatus(o,r),s(Z.actions.updateAdminStatus({adminId:o,status:r})),r}catch(l){throw console.log(l),new Error("Error updating status")}}),Re=["success","danger","warning","info","dark","primary","secondary"],A=new k,Ie=(o,r)=>[{name:"ID",sortable:!0,maxWidth:"100px",selector:s=>s.id},{name:"Name",sortable:!0,minWidth:"225px",selector:s=>s.name,cell:s=>e.jsxs("div",{className:"d-flex align-items-center",children:[s.image===""?e.jsx(D,{color:`light-${Re[s.status]}`,content:s.name,initials:!0}):e.jsx(D,{img:`${A.baseurl()}${s.image}`}),e.jsx("div",{className:"user-info text-truncate ms-1",children:e.jsx("span",{className:"d-block fw-bold text-truncate",children:e.jsx(L,{to:`${s.id}/edit`,state:{adminDatas:s},children:s.name})})})]})},{name:"Email",sortable:!0,minWidth:"310px",selector:s=>s.email},{name:"Mobile",sortable:!0,minWidth:"250px",selector:s=>s.mobile},{name:"Type",sortable:!0,minWidth:"100px",selector:s=>s.type},{name:"Status",sortable:!0,minWidth:"175px",selector:s=>s.status,cell:s=>{const[l,c]=d.useState(parseInt(s.status,10)===1),p=async()=>{try{const u=l?0:1;R.promise(r(We({adminId:s.id,status:u})),{position:"bottom-left",loading:"Updating the Status...",success:()=>(c(!l),"Saved successfully!"),error:x=>(console.log(x),"Error updating!")})}catch(u){return console.log(u),"Invalid Data!"}};return e.jsxs("div",{className:"form-switch form-check-primary",children:[e.jsx(j,{type:"switch",name:"icon-primary",id:"icon-primary",checked:l,onChange:()=>c(!l),onClick:p}),e.jsx("div",{style:{marginTop:"-1.4rem"},children:l?"Active":"InActive"})]})}},{name:"Actions",allowOverflow:!0,cell:s=>{const l=async()=>{try{await A.deleteAdmin(s.id),console.log("Admin deleted successfully"),o()}catch(c){console.log(c)}};return e.jsxs("div",{className:"d-flex",children:[e.jsxs(he,{children:[e.jsx(I,{className:"pe-1",tag:"span",style:{cursor:"pointer"},children:e.jsx(Ne,{size:15})}),e.jsxs(M,{end:!0,children:[e.jsxs(N,{tag:L,to:`${s.id}/edit`,className:"w-100",children:[e.jsx(U,{size:15}),e.jsx("span",{className:"align-middle ms-50",children:"Details"})]}),e.jsxs(N,{tag:"a",href:"/",className:"w-100",onClick:c=>c.preventDefault(),children:[e.jsx(ee,{size:15}),e.jsx("span",{className:"align-middle ms-50",children:"Archive"})]}),e.jsxs(N,{tag:"a",href:"/",className:"w-100",onClick:c=>{c.preventDefault(),l(s.id)},children:[e.jsx(we,{size:15}),e.jsx("span",{className:"align-middle ms-50",children:"Delete"})]})]})]}),e.jsx(L,{to:`${s.id}/edit`,children:e.jsx(se,{size:15})})]})}}],Me=async()=>{try{return(await A.getData()).data}catch(o){console.log(o)}},Ue=({open:o,handleModal:r})=>{const[s,l]=d.useState(new Date),c=e.jsx(je,{className:"cursor-pointer",size:15,onClick:r});return e.jsxs(ae,{isOpen:o,toggle:r,className:"sidebar-sm",modalClassName:"modal-slide-in",contentClassName:"pt-0",children:[e.jsx(te,{className:"mb-1",toggle:r,close:c,tag:"div",children:e.jsx("h5",{className:"modal-title",children:"New Record"})}),e.jsxs(ne,{className:"flex-grow-1",children:[e.jsxs("div",{className:"mb-1",children:[e.jsx(g,{className:"form-label",for:"full-name",children:"Full Name"}),e.jsxs(C,{children:[e.jsx(b,{children:e.jsx(pe,{size:15})}),e.jsx(j,{id:"full-name",placeholder:"Bruce Wayne"})]})]}),e.jsxs("div",{className:"mb-1",children:[e.jsx(g,{className:"form-label",for:"post",children:"Post"}),e.jsxs(C,{children:[e.jsx(b,{children:e.jsx(re,{size:15})}),e.jsx(j,{id:"post",placeholder:"Web Developer"})]})]}),e.jsxs("div",{className:"mb-1",children:[e.jsx(g,{className:"form-label",for:"email",children:"Email"}),e.jsxs(C,{children:[e.jsx(b,{children:e.jsx(xe,{size:15})}),e.jsx(j,{type:"email",id:"email",placeholder:"brucewayne@email.com"})]})]}),e.jsxs("div",{className:"mb-1",children:[e.jsx(g,{className:"form-label",for:"joining-date",children:"Joining Date"}),e.jsxs(C,{children:[e.jsx(b,{children:e.jsx(ke,{size:15})}),e.jsx(ve,{className:"form-control",id:"joining-date",value:s,onChange:p=>l(p)})]})]}),e.jsxs("div",{className:"mb-1",children:[e.jsx(g,{className:"form-label",for:"salary",children:"Salary"}),e.jsxs(C,{children:[e.jsx(b,{children:e.jsx(ie,{size:15})}),e.jsx(j,{type:"number",id:"salary"})]})]}),e.jsx(S,{className:"me-1",color:"primary",onClick:r,children:"Submit"}),e.jsx(S,{color:"secondary",onClick:r,outline:!0,children:"Cancel"})]})]})},W=new k,Fe=(o,r,s)=>{d.useEffect(()=>{let l;async function c(){const p=new ye({broadcaster:"pusher",key:"alikoza",cluster:"mt1",encrypted:!1,wsHost:"api.dealmanager.co.uk",wsPort:6004,wssPort:6004,disableStats:!0,forceTLS:!1,authEndpoint:`${W.baseurl().replace(/\s/g,"")}/api/admin/subscribeToAdminsList`,authorizer:x=>({authorize:async(w,y)=>{try{const m=await W.subscribeToAdminsList(w,x.name);y(!1,m.data),r(m)}catch(m){y(!0,m),o(m)}}})}),u=p.private("admins");u.listen(".App\\Events\\Admin\\AdminListUpdated",x=>{s(x)}),l=()=>{u.stopListening(".App\\Events\\Admin\\AdminListUpdated"),p.disconnect()}}return c(),()=>{l&&l()}},[])},$e=d.forwardRef((o,r)=>e.jsx("div",{className:"form-check",children:e.jsx(j,{type:"checkbox",ref:r,...o})})),ss=()=>{const[o,r]=d.useState([]),[s,l]=d.useState(!1),[c,p]=d.useState(0),[u,x]=d.useState(""),[w,y]=d.useState([]),[m,P]=d.useState([]),[F,f]=d.useState(!0),$=new k,B=ge(),E=()=>l(!s),V=t=>{t.response&&t.response.status===401&&$.refreshToken()},O=t=>{console.log("for testing only",t)},H=t=>{f(!0);const a=t.admins;P(i=>{const n=i.findIndex(h=>h.id===a.id);return n!==-1?[...i.slice(0,n),a,...i.slice(n+1)]:i}),setTimeout(()=>{f(!1),R(e.jsx(Ce,{shouldForwardProp:i=>be(i),children:e.jsxs("div",{className:"d-flex",children:[e.jsx("div",{className:"me-1",children:e.jsx(D,{size:"sm",color:"success",icon:e.jsx(ze,{size:12})})}),e.jsxs("div",{className:"d-flex flex-column",children:[e.jsx("h6",{children:"Form Updated!"}),e.jsx("div",{}),e.jsx("span",{children:"List Updated by Admin!"})]})]})}))},400)},z=async()=>{try{f(!0);const t=await Me();P(t),f(!1)}catch(t){console.log(t),f(!1)}},G=Ie(z,B);d.useEffect(()=>{z()},[]),Fe(V,O,H);const Q=t=>{const a=t.target.value;let i=[];x(a),a.length&&(i=m.filter(n=>{const h=n.name.toLowerCase().startsWith(a.toLowerCase())||n.email.toLowerCase().startsWith(a.toLowerCase())||n.mobile.toLowerCase().startsWith(a.toLowerCase())||n.type.toLowerCase().startsWith(a.toLowerCase())||n.image.toLowerCase().startsWith(a.toLowerCase()),v=n.name.toLowerCase().includes(a.toLowerCase())||n.email.toLowerCase().includes(a.toLowerCase())||n.mobile.toLowerCase().startsWith(a.toLowerCase())||n.type.toLowerCase().startsWith(a.toLowerCase())||n.image.toLowerCase().startsWith(a.toLowerCase());return h||(!h&&v?v:null)}),y(i),x(a))},J=t=>{p(t.selected)},X=()=>e.jsx(ue,{previousLabel:"",nextLabel:"",forcePage:c,onPageChange:t=>J(t),pageCount:u.length?Math.ceil(w.length/7):Math.ceil(m.length/7)||1,breakLabel:"...",pageRangeDisplayed:2,marginPagesDisplayed:2,activeClassName:"active",pageClassName:"page-item",breakClassName:"page-item",nextLinkClassName:"page-link",pageLinkClassName:"page-link",breakLinkClassName:"page-link",previousLinkClassName:"page-link",nextClassName:"page-item next-item",previousClassName:"page-item prev-item",containerClassName:"pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1"});function _(t){let a;const i=",",n=`
`,h=Object.keys(m[0]);return a="",a+=h.join(i),a+=n,t.forEach(v=>{let T=0;h.forEach(K=>{T>0&&(a+=i),a+=v[K],T++}),a+=n}),a}function q(){const t=o.length>0?o:m,a=document.createElement("a");let i=_(t);if(i===null)return;const n="export.csv";i.match(/^data:text\/csv/i)||(i=`data:text/csv;charset=utf-8,${i}`),a.setAttribute("href",encodeURI(i)),a.setAttribute("download",n),a.click()}return e.jsxs(d.Fragment,{children:[e.jsxs(Ae,{children:[e.jsxs(Pe,{className:"flex-md-row flex-column align-md-items-center align-items-start border-bottom",children:[e.jsx(Ee,{tag:"h4",children:"Admins List"}),e.jsxs("div",{className:"d-flex mt-md-0 mt-1",children:[e.jsxs(Le,{children:[e.jsxs(I,{color:"secondary",caret:!0,outline:!0,children:[e.jsx(le,{size:15}),e.jsx("span",{className:"align-middle ms-50",children:"Export"})]}),e.jsxs(M,{children:[e.jsxs(N,{className:"w-100",children:[e.jsx(oe,{size:15}),e.jsx("span",{className:"align-middle ms-50",children:"Print"})]}),e.jsxs(N,{className:"w-100",onClick:()=>q(),children:[e.jsx(U,{size:15}),e.jsx("span",{className:"align-middle ms-50",children:"CSV"})]})]})]}),e.jsxs(S,{className:"ms-2",color:"primary",onClick:E,children:[e.jsx(ce,{size:15}),e.jsx("span",{className:"align-middle ms-50",children:"Add Record"})]})]})]}),e.jsx(Se,{className:"justify-content-end mx-0",children:e.jsxs(De,{className:"d-flex align-items-center justify-content-end mt-1",md:"6",sm:"12",children:[e.jsx(g,{className:"me-1",for:"search-input",children:"Search"}),e.jsx(j,{className:"dataTable-filter mb-50",type:"text",bsSize:"sm",id:"search-input",value:u,onChange:Q})]})}),e.jsx("div",{className:"react-dataTable react-dataTable-selectable-rows",children:F?e.jsx("div",{className:"d-flex justify-content-center align-items-center py-5",children:e.jsx(fe,{color:"primary"})}):e.jsx("div",{className:"table-responsive",children:e.jsx(de,{noHeader:!0,pagination:!0,selectableRows:!0,columns:G,paginationPerPage:7,className:"react-dataTable",sortIcon:e.jsx(me,{size:10}),paginationComponent:X,paginationDefaultPage:c+1,selectableRowsComponent:$e,data:u.length?w:m,onSelectedRowsChange:t=>r(t.selectedRows)})})})]}),e.jsx(Ue,{open:s,handleModal:E})]})};export{ss as default};
