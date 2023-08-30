import{D as A,a0 as Y,a1 as Z,w as e,L as k,r as d,Q as v,B as S}from"./index-799ec526.js";import{A as _,E as ee,S as se,P as ae,a as te,Q as ne,C as re,R as ie}from"./index.es-416240ea.js";import{A as D,U as le,D as R,b as E,c as N,F as I,d as oe,M as ce,X as de,a as me,P as ue,e as he,i as xe}from"./App-76c3559e.js";import{I as h,L as x}from"./Label-7980a7d7.js";import{M as pe,T as je}from"./trash-ac8b4371.js";import{F as ge}from"./flatpickr-8c5da3e1.js";import{M as fe,a as Ce,b as Ne,B as be,D as we}from"./dollar-sign-47878bca.js";import{I as f,a as C}from"./InputGroupText-5c7d9102.js";import{C as ye}from"./calendar-70c47cb6.js";import{u as ve}from"./useSubscribeToChannel-0a8d3489.js";import{R as ke,C as Se}from"./Col-740eac10.js";import{C as De}from"./Card-2b73a7fd.js";import{C as Le}from"./CardHeader-1a15b067.js";import{C as Ae}from"./CardTitle-2ca3b30f.js";import{U as Pe}from"./UncontrolledButtonDropdown-52abae5f.js";import{C as ze}from"./check-786ae700.js";import"./Fade-c46db253.js";import"./pusher-ef6f9223.js";const We=new A,Te=Y("admin/updateAdminStatus",async({adminId:l,status:i},{dispatch:s})=>{try{return await We.updateAdminStatus(l,i),s(Z.actions.updateAdminStatus({adminId:l,status:i})),i}catch(o){throw console.log(o),new Error("Error updating status")}}),Re=["success","danger","warning","info","dark","primary","secondary"],L=new A,Ee=(l,i)=>[{name:"ID",sortable:!0,maxWidth:"100px",selector:s=>s.id},{name:"Name",sortable:!0,minWidth:"225px",selector:s=>s.name,cell:s=>e.jsxs("div",{className:"d-flex align-items-center",children:[s.image===""?e.jsx(D,{color:`light-${Re[s.status]}`,content:s.name,initials:!0}):e.jsx(D,{img:`${L.baseurl()}${s.image}`}),e.jsx("div",{className:"user-info text-truncate ms-1",children:e.jsx("span",{className:"d-block fw-bold text-truncate",children:e.jsx(k,{to:`${s.id}/edit`,state:{adminDatas:s},children:s.name})})})]})},{name:"Email",sortable:!0,minWidth:"310px",selector:s=>s.email},{name:"Mobile",sortable:!0,minWidth:"250px",selector:s=>s.mobile},{name:"Type",sortable:!0,minWidth:"100px",selector:s=>s.type},{name:"Status",sortable:!0,minWidth:"175px",selector:s=>s.status,cell:s=>{const[o,c]=d.useState(parseInt(s.status,10)===1),p=async()=>{try{const u=o?0:1,b=i(Te({adminId:s.id,status:u}));v.promise(b,{pending:"Updating the Status...",success:()=>(c(!o),v.dismiss(),"Saved successfully!"),error:w=>(console.log(w),"Error updating!")})}catch(u){return console.log(u),"Invalid Data!"}};return e.jsxs("div",{className:"form-switch form-check-primary",children:[e.jsx(h,{type:"switch",name:"icon-primary",id:"icon-primary",checked:o,onChange:()=>c(!o),onClick:p}),e.jsx("div",{style:{marginTop:"-1.4rem"},children:o?"Active":"InActive"})]})}},{name:"Actions",allowOverflow:!0,cell:s=>{const o=async()=>{try{await L.deleteAdmin(s.id),console.log("Admin deleted successfully"),l()}catch(c){console.log(c)}};return e.jsxs("div",{className:"d-flex",children:[e.jsxs(le,{children:[e.jsx(R,{className:"pe-1",tag:"span",style:{cursor:"pointer"},children:e.jsx(pe,{size:15})}),e.jsxs(E,{end:!0,children:[e.jsxs(N,{tag:k,to:`${s.id}/edit`,className:"w-100",children:[e.jsx(I,{size:15}),e.jsx("span",{className:"align-middle ms-50",children:"Details"})]}),e.jsxs(N,{tag:"a",href:"/",className:"w-100",onClick:c=>c.preventDefault(),children:[e.jsx(_,{size:15}),e.jsx("span",{className:"align-middle ms-50",children:"Archive"})]}),e.jsxs(N,{tag:"a",href:"/",className:"w-100",onClick:c=>{c.preventDefault(),o()},children:[e.jsx(je,{size:15}),e.jsx("span",{className:"align-middle ms-50",children:"Delete"})]})]})]}),e.jsx(k,{to:`${s.id}/edit`,children:e.jsx(ee,{size:15})})]})}}],Ie=async()=>{try{return(await L.getData()).data}catch(l){console.log(l)}},Me=({open:l,handleModal:i})=>{const[s,o]=d.useState(new Date),c=e.jsx(de,{className:"cursor-pointer",size:15,onClick:i});return e.jsxs(fe,{isOpen:l,toggle:i,className:"sidebar-sm",modalClassName:"modal-slide-in",contentClassName:"pt-0",children:[e.jsx(Ce,{className:"mb-1",toggle:i,close:c,tag:"div",children:e.jsx("h5",{className:"modal-title",children:"New Record"})}),e.jsxs(Ne,{className:"flex-grow-1",children:[e.jsxs("div",{className:"mb-1",children:[e.jsx(x,{className:"form-label",for:"full-name",children:"Full Name"}),e.jsxs(f,{children:[e.jsx(C,{children:e.jsx(oe,{size:15})}),e.jsx(h,{id:"full-name",placeholder:"Bruce Wayne"})]})]}),e.jsxs("div",{className:"mb-1",children:[e.jsx(x,{className:"form-label",for:"post",children:"Post"}),e.jsxs(f,{children:[e.jsx(C,{children:e.jsx(be,{size:15})}),e.jsx(h,{id:"post",placeholder:"Web Developer"})]})]}),e.jsxs("div",{className:"mb-1",children:[e.jsx(x,{className:"form-label",for:"email",children:"Email"}),e.jsxs(f,{children:[e.jsx(C,{children:e.jsx(ce,{size:15})}),e.jsx(h,{type:"email",id:"email",placeholder:"brucewayne@email.com"})]})]}),e.jsxs("div",{className:"mb-1",children:[e.jsx(x,{className:"form-label",for:"joining-date",children:"Joining Date"}),e.jsxs(f,{children:[e.jsx(C,{children:e.jsx(ye,{size:15})}),e.jsx(ge,{className:"form-control",id:"joining-date",value:s,onChange:p=>o(p)})]})]}),e.jsxs("div",{className:"mb-1",children:[e.jsx(x,{className:"form-label",for:"salary",children:"Salary"}),e.jsxs(f,{children:[e.jsx(C,{children:e.jsx(we,{size:15})}),e.jsx(h,{type:"number",id:"salary"})]})]}),e.jsx(S,{className:"me-1",color:"primary",onClick:i,children:"Submit"}),e.jsx(S,{color:"secondary",onClick:i,outline:!0,children:"Cancel"})]})]})},Fe=d.forwardRef((l,i)=>e.jsx("div",{className:"form-check",children:e.jsx(h,{type:"checkbox",ref:i,...l})})),ts=()=>{const[l,i]=d.useState([]),[s,o]=d.useState(!1),[c,p]=d.useState(0),[u,b]=d.useState(""),[w,M]=d.useState([]),[j,P]=d.useState([]),[F,g]=d.useState(!0),B=new A,U=me(),z=()=>o(!s),$=t=>{t.response&&t.response.status===401&&B.refreshToken()},V=t=>{console.log("for testing only",t)},O=t=>{g(!0);const a=t.admins;P(r=>{const n=r.findIndex(m=>m.id===a.id);return n!==-1?[...r.slice(0,n),a,...r.slice(n+1)]:r}),setTimeout(()=>{g(!1),v.dismiss(),v(e.jsx(he,{shouldForwardProp:r=>xe(r),children:e.jsxs("div",{className:"d-flex",children:[e.jsx("div",{className:"me-1",children:e.jsx(D,{size:"sm",color:"success",icon:e.jsx(ze,{size:12})})}),e.jsxs("div",{className:"d-flex flex-column",children:[e.jsx("h6",{children:"Form Updated!"}),e.jsx("div",{}),e.jsx("span",{children:"List Updated by Admin!"})]})]})}))},400)},W=async()=>{try{g(!0);const t=await Ie();P(t),g(!1)}catch(t){console.log(t),g(!1)}},H=Ee(W,U);d.useEffect(()=>{W()},[]),ve("admins",$,V,O);const Q=t=>{const a=t.target.value;let r=[];b(a),a.length&&(r=j.filter(n=>{const m=n.name.toLowerCase().startsWith(a.toLowerCase())||n.email.toLowerCase().startsWith(a.toLowerCase())||n.mobile.toLowerCase().startsWith(a.toLowerCase())||n.type.toLowerCase().startsWith(a.toLowerCase())||n.image.toLowerCase().startsWith(a.toLowerCase()),y=n.name.toLowerCase().includes(a.toLowerCase())||n.email.toLowerCase().includes(a.toLowerCase())||n.mobile.toLowerCase().startsWith(a.toLowerCase())||n.type.toLowerCase().startsWith(a.toLowerCase())||n.image.toLowerCase().startsWith(a.toLowerCase());return m||(!m&&y?y:null)}),M(r),b(a))},G=t=>{p(t.selected)},J=()=>e.jsx(ie,{previousLabel:"",nextLabel:"",forcePage:c,onPageChange:t=>G(t),pageCount:u.length?Math.ceil(w.length/7):Math.ceil(j.length/7)||1,breakLabel:"...",pageRangeDisplayed:2,marginPagesDisplayed:2,activeClassName:"active",pageClassName:"page-item",breakClassName:"page-item",nextLinkClassName:"page-link",pageLinkClassName:"page-link",breakLinkClassName:"page-link",previousLinkClassName:"page-link",nextClassName:"page-item next-item",previousClassName:"page-item prev-item",containerClassName:"pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1"});function X(t){let a;const r=",",n=`
`,m=Object.keys(j[0]);return a="",a+=m.join(r),a+=n,t.forEach(y=>{let T=0;m.forEach(K=>{T>0&&(a+=r),a+=y[K],T++}),a+=n}),a}function q(){const t=l.length>0?l:j,a=document.createElement("a");let r=X(t);if(r===null)return;const n="export.csv";r.match(/^data:text\/csv/i)||(r=`data:text/csv;charset=utf-8,${r}`),a.setAttribute("href",encodeURI(r)),a.setAttribute("download",n),a.click()}return e.jsxs(d.Fragment,{children:[e.jsxs(De,{children:[e.jsxs(Le,{className:"flex-md-row flex-column align-md-items-center align-items-start border-bottom",children:[e.jsx(Ae,{tag:"h4",children:"Admins List"}),e.jsxs("div",{className:"d-flex mt-md-0 mt-1",children:[e.jsxs(Pe,{children:[e.jsxs(R,{color:"secondary",caret:!0,outline:!0,children:[e.jsx(se,{size:15}),e.jsx("span",{className:"align-middle ms-50",children:"Export"})]}),e.jsxs(E,{children:[e.jsxs(N,{className:"w-100",children:[e.jsx(ae,{size:15}),e.jsx("span",{className:"align-middle ms-50",children:"Print"})]}),e.jsxs(N,{className:"w-100",onClick:()=>q(),children:[e.jsx(I,{size:15}),e.jsx("span",{className:"align-middle ms-50",children:"CSV"})]})]})]}),e.jsxs(S,{className:"ms-2",color:"primary",onClick:z,children:[e.jsx(te,{size:15}),e.jsx("span",{className:"align-middle ms-50",children:"Add Record"})]})]})]}),e.jsx(ke,{className:"justify-content-end mx-0",children:e.jsxs(Se,{className:"d-flex align-items-center justify-content-end mt-1",md:"6",sm:"12",children:[e.jsx(x,{className:"me-1",for:"search-input",children:"Search"}),e.jsx(h,{className:"dataTable-filter mb-50",type:"text",bsSize:"sm",id:"search-input",value:u,onChange:Q})]})}),e.jsx("div",{className:"react-dataTable react-dataTable-selectable-rows",children:F?e.jsx("div",{className:"d-flex justify-content-center align-items-center py-5",children:e.jsx(ue,{color:"primary"})}):e.jsx("div",{className:"table-responsive",children:e.jsx(ne,{noHeader:!0,pagination:!0,selectableRows:!0,columns:H,paginationPerPage:7,className:"react-dataTable",sortIcon:e.jsx(re,{size:10}),paginationComponent:J,paginationDefaultPage:c+1,selectableRowsComponent:Fe,data:u.length?w:j,onSelectedRowsChange:t=>i(t.selectedRows)})})})]}),e.jsx(Me,{open:s,handleModal:z})]})};export{ts as default};
