import{r as b,w as e,C as ae,D as z,b as Ae,B as te,b6 as U,a2 as re,s as P,Q as xe,b7 as se,b8 as Ne,b9 as Se,ba as we}from"./index-abc351d2.js";import{A as Fe,a as V,g as ie,s as I}from"./App-7610d975.js";import{u as le,C as S}from"./index.esm-e8fa0124.js";import{R as E,C as N}from"./Col-1167a184.js";import{C as ne}from"./Card-7d725e4b.js";import{C as ce}from"./CardBody-6b9606c1.js";import{C as oe}from"./CardHeader-6b102f9d.js";import{C as de}from"./CardTitle-fca04419.js";import{F as ue}from"./Form-93afb0e8.js";import{F as w}from"./FormFeedback-a551829a.js";import{F as H,f as Z,a as ke}from"./index.esm-56e871b2.js";import{I as $,L as F}from"./Label-0ec83379.js";import{S as L}from"./react-select.esm-85c89579.js";import{C as qe}from"./check-b22b1195.js";import{A as Ie,w as Le,S as Pe}from"./ext-component-sweet-alerts-d05955b3.js";import{F as ee}from"./flatpickr-848b2bd5.js";import"./Fade-f76360cc.js";const Ee=(a,y,v,i,c,p,f)=>{const _=y("departure_country"),m=y("arrival_country"),j=y("departure_city"),u=y("arrival_city");b.useEffect(()=>{(()=>{if(v&&c.dealData&&c.dealData[p]){const r=v.find(o=>o.id===c.dealData[p].departure_country_id);a("departure_country",(r==null?void 0:r.id)||"")}if(v&&c.dealData&&c.dealData[p]){const r=v.find(o=>o.id===c.dealData[p].arrival_country_id);a("arrival_country",(r==null?void 0:r.id)||"")}if(i&&c.dealData&&c.dealData[p]){const r=i.find(o=>o.id===c.dealData[p].departure_city_id);a("departure_city",(r==null?void 0:r.id)||"")}if(i&&c.dealData&&c.dealData[p]){const r=i.find(o=>o.id===c.dealData[p].arrival_city_id);a("arrival_city",(r==null?void 0:r.id)||"")}if(f&&c.dealData&&c.dealData[p]){const r=f.find(o=>o.id===c.dealData[p].arrival_airport_id);a("arrival_airport",(r==null?void 0:r.id)||"")}if(f&&c.dealData&&c.dealData[p]){const r=f.find(o=>o.id===c.dealData[p].departure_airport_id);a("departure_airport",(r==null?void 0:r.id)||"")}})()},[v,f,i,c.dealData,p,a]),b.useEffect(()=>{if(i&&_){const h=i.find(r=>r.country_id===_);a("departure_city",(h==null?void 0:h.id)||"")}},[i,_,a]),b.useEffect(()=>{if(i&&m){const h=i.find(r=>r.country_id===m);a("arrival_city",(h==null?void 0:h.id)||"")}},[i,m,a]),b.useEffect(()=>{if(f&&j){const h=f.find(r=>r.city_id===j);a("departure_airport",(h==null?void 0:h.id)||"")}},[f,j,a]),b.useEffect(()=>{if(f&&u){const h=f.find(r=>r.city_id===u);a("arrival_airport",(h==null?void 0:h.id)||"")}},[f,u,a])},He=(a,y,v,i,c,p,f,_)=>{const[m,j]=b.useState([]),[u,h]=b.useState([]),[r,o]=b.useState([]),[g,t]=b.useState([]),s=A=>{if(A){const D=a.filter(k=>k.country_id===A);if(j(D),D.length>0){const k=y.filter(M=>M.city_id===D[0].id);o(k)}else o([])}},x=A=>{if(A){const D=a.filter(k=>k.country_id===A);if(h(D),D.length>0){const k=y.filter(M=>M.city_id===D[0].id);t(k)}else t([])}},C=A=>{A&&v("user_id",A)},R=A=>{if(A){const D=y.filter(k=>k.city_id===A);o(D),D.length>0?v("departure_airport",D[0].id):v("departure_airport","")}else o([])},B=A=>{if(A){const D=y.filter(k=>k.city_id===A);t(D),D.length>0?v("arrival_airport",D[0].id):v("arrival_airport","")}else t([])};return b.useEffect(()=>{i&&s(i.id),f&&x(f.id),_&&C(_.id),c&&R(c.id),p&&B(p.id)},[i,f,c,p,_]),{handleDepartureCountryChange:s,handleArrivalCountryChange:x,handleUserChange:C,filteredDepartureCities:m,filteredArrivalCities:u,filteredDepartureAirports:r,handleDepartureCityChange:R,handleArrivalCityChange:B,filteredArrivalAirports:g}},Me=(a,y,v,i,c,p,f,_,m)=>{const[j,u]=b.useState(!1);return{onSubmit:async r=>{u(!0);const o=t=>{const s=["Select City","Select Country","Select Airport",""," ","Select..."];return typeof t=="object"?t!=null&&Object.keys(t).length>0:typeof t!="object"&&t.toString().length>0&&!s.includes(t)};if(Object.values(r).every(o)&&(!y||Object.keys(y).length===0)){console.log(r.duty_free.value);try{const t={id:v,arrival_airport_id:r.arrival_airport,arrival_city_id:r.arrival_city,arrival_country_id:r.arrival_country,delivery_type:r.delivery_type.value,departure_airport_id:r.departure_airport,departure_city_id:r.departure_city,departure_country_id:r.departure_country,price:r.price,weight:r.weight,status:r.status.value,departure_date:r.departure_date,arrival_date:r.arrival_date,duty_free:r.duty_free.value},s=await c.updateUserDealDetails(t,v);s.status===201&&(u(!1),localStorage.setItem("lastUpdated",Date.now()),p(f(s.data)),_(e.jsxs("div",{className:"d-flex",children:[e.jsx("div",{className:"me-1",children:e.jsx(Fe,{size:"sm",color:"success",icon:e.jsx(qe,{size:12})})}),e.jsxs("div",{className:"d-flex flex-column",children:[e.jsx("h6",{children:"Form Submitted!"}),e.jsx("div",{}),e.jsx("span",{children:"You have successfully updated the Deal details!"})]})]})))}catch(t){if(console.log(t),u(!1),t.response&&t.response.status===422){const s=t.response.data.errors;s.user_name?m("user_name",{type:"manual",message:s.user_name?s.user_name:"Incorrect username"}):s.paflightssword?m("flight",{type:"manual",message:s.flight?s.flight:"Incorrect flight"}):s.delivery_type?m("delivery_type",{type:"manual",message:s.delivery_type?s.delivery_type:"Incorrect delivery type"}):s.price?m("price",{type:"manual",message:s.price?s.price:"Incorrect price"}):s.weight?m("weight",{type:"manual",message:s.weight?s.weight:"Incorrect weight"}):s.departure_airport?m("departure_airport",{type:"manual",message:s.departure_airport?s.departure_airport:"Incorrect departure airport"}):s.arrival_airport?m("arrival_airport",{type:"manual",message:s.arrival_airport?s.arrival_airport:"Incorrect arrival airport"}):s.departure_country?m("departure_country",{type:"manual",message:s.departure_country?s.departure_country:"Incorrect country"}):s.arrival_country?m("arrival_country",{type:"manual",message:s.arrival_country?s.arrival_country:"Incorrect country"}):s.departure_city?m("departure_city",{type:"manual",message:s.departure_city?s.departure_city:"Incorrect city"}):s.arrival_city?m("arrival_city",{type:"manual",message:s.arrival_city?s.arrival_city:"Incorrect city"}):s.arrival_date?m("arrival_date",{type:"manual",message:s.arrival_date?s.arrival_date:"Incorrect date"}):s.departure_date?m("departure_date",{type:"manual",message:s.departure_date?s.departure_date:"Incorrect date"}):s.status&&m("status",{type:"manual",message:s.status?s.status:"Incorrect correct status"})}else console.error("Unexpected error:",t)}}else for(const t in r)if(!o(r[t])){const s=r[t]===""||typeof r[t]=="object"&&Object.keys(r[t]).length===0?`The ${t} field has no available options.`:`The ${t} field is required.`;m(t,{type:"manual",message:s})}},isLoading:j,setIsLoading:u}},Re={confirmCheckbox:!1},T=Le(Pe),Be=({id:a})=>{const y=V(),v=ae(),i=new z,{control:c,setError:p,handleSubmit:f,formState:{errors:_}}=le({defaultValues:Re}),m=async()=>{const u=await T.fire({title:"Are you sure?",text:"Are you sure you would like to delete the deal?",icon:"warning",showCancelButton:!0,confirmButtonText:"Yes, delete it!",customClass:{confirmButton:"btn btn-primary",cancelButton:"btn btn-danger ms-1"},buttonsStyling:!1});if(u.value)try{y(U(!0)),await i.deleteUserDeal(a),y(U(!1)),T.fire({icon:"success",title:"Deleted!",text:"Your account has been deactivated.",customClass:{confirmButton:"btn btn-success"}}),v(ie())}catch(h){console.log(h)}else u.dismiss===T.DismissReason.cancel&&T.fire({title:"Cancelled",text:"Deletion Cancelled!!",icon:"error",customClass:{confirmButton:"btn btn-success"}})},j=u=>{u.confirmCheckbox===!0?m():p("confirmCheckbox",{type:"manual"})};return e.jsxs(ne,{children:[e.jsx(oe,{className:"border-bottom",children:e.jsx(de,{tag:"h4",children:"Delete Deal"})}),e.jsxs(ce,{className:"py-2 my-25",children:[e.jsxs(Ie,{color:"warning",children:[e.jsx("h4",{className:"alert-heading",children:"Are you sure you want to delete a deal?"}),e.jsx("div",{className:"alert-body fw-normal",children:"Once you delete your deal, there is no going back. Please be certain."})]}),e.jsxs(ue,{onSubmit:f(j),children:[e.jsxs("div",{className:"form-check",children:[e.jsx(S,{control:c,name:"confirmCheckbox",render:({field:u})=>e.jsx($,{...u,type:"checkbox",id:"confirmCheckbox",checked:u.value,invalid:_.confirmCheckbox&&!0})}),e.jsx(F,{for:"confirmCheckbox",className:Ae("form-check-label",{"text-danger":_==null?void 0:_.confirmCheckbox}),children:"I confirm to delete the deal"}),(_==null?void 0:_.confirmCheckbox)&&e.jsx(w,{children:"Please confirm that you want to delete a deal"})]}),e.jsx("div",{className:"mt-1",children:e.jsx(te,{color:"danger",children:"Delete Deal"})})]})]})]})},Te=(a,y,v,i,c)=>{var r,o;const p=a.find(g=>{var t;return g.id===((t=i==null?void 0:i.dealData[c])==null?void 0:t.departure_country_id)}),f=a.find(g=>{var t;return g.id===((t=i==null?void 0:i.dealData[c])==null?void 0:t.arrival_country_id)}),_=y.find(g=>{var t;return g.id===((t=i==null?void 0:i.dealData[c])==null?void 0:t.departure_city_id)}),m=y.find(g=>{var t;return g.id===((t=i==null?void 0:i.dealData[c])==null?void 0:t.arrival_city_id)}),j=v.find(g=>{var t;return g.id===((t=i==null?void 0:i.dealData[c])==null?void 0:t.departure_airport_id)}),u=v.find(g=>{var t;return g.id===((t=i==null?void 0:i.dealData[c])==null?void 0:t.arrival_airport_id)}),h=((o=(r=i.dealData[c])==null?void 0:r.user)==null?void 0:o.find(g=>{var t;return g.id===((t=i==null?void 0:i.dealData[c])==null?void 0:t.user_id.id)}))||null;return{defaultDepartureCountry:p,defaultArrivalCountry:f,defaultDepartureCity:_,defaultArrivalCity:m,defaultDepartureAirport:j,defaultArrivalAirport:u,defaultUser:h}},Ue=({redux:a})=>{var G,Q,J,K;const y=V(),v=new z,{id:i}=re(),c=[{value:"approved",label:"Approved"},{value:"pending",label:"Pending"},{value:"rejected",label:"Rejected"}],[p,f]=b.useState(""),_=l=>{const{options:n,children:d,maxHeight:q,getValue:je}=l,[De]=je(),be=n.indexOf(De)*35,O=p&&!n.some(Y=>Y.label.toLowerCase().includes(p.toLowerCase())),Ce=O?65:q;render(e.jsx(ke,{height:Ce,itemCount:O?1:d.length,itemSize:35,initialScrollOffset:be,width:"100%",children:({index:Y,style:X})=>e.jsx("div",{style:X,children:O?e.jsx("div",{style:{...X,textAlign:"center"},children:"No Option"}):d[Y]})}))},m=[{value:"hand_luggage",label:"Hand Luggage"},{value:"baggage",label:"Baggage"},{value:"document",label:"Document"}],j=[{value:0,label:"Inactive"},{value:1,label:"Active"}],{control:u,setValue:h,setError:r,watch:o,handleSubmit:g,formState:{errors:t}}=le(),s=P(l=>l.useEditDealData.countries),x=P(l=>l.useEditDealData.cities),C=P(l=>l.useEditDealData.airports);Ee(h,o,s,x,a,i,C);const{defaultDepartureCountry:R,defaultDepartureCity:B,defaultArrivalCity:A,defaultArrivalCountry:D,defaultUser:k}=Te(s,x,C,a,i),{handleDepartureCountryChange:M,handleArrivalCountryChange:me,handleDepartureCityChange:pe,handleArrivalCityChange:fe,filteredDepartureCities:he,filteredArrivalCities:ye,filteredDepartureAirports:ve,filteredArrivalAirports:_e}=He(x,C,h,R,B,A,D,k),{onSubmit:ge,isLoading:W}=Me(g,t,i,a,v,y,se,xe,r);return e.jsxs(b.Fragment,{children:[e.jsxs(ne,{children:[e.jsx(oe,{className:"border-bottom",children:e.jsx(de,{tag:"h4",children:"Edit Deal Details"})}),e.jsx(ce,{className:"py-2 my-25",children:e.jsxs(ue,{className:"mt-2 pt-50",onSubmit:g(ge),children:[e.jsxs(E,{children:[e.jsx(N,{md:"6",children:e.jsxs("div",{className:"mb-1",children:[e.jsx(F,{className:"form-label",for:"priceAsync",children:"Price"}),e.jsx(S,{defaultValue:((G=a==null?void 0:a.dealData[i])==null?void 0:G.price)||"",control:u,rules:{required:"Price is required"},id:"priceAsync",name:"price",render:({field:l})=>e.jsx($,{...l,type:"number",placeholder:"Price",invalid:t.price&&!0})}),t.price&&e.jsx(w,{children:t.price.message})]})}),e.jsx(N,{md:"6",children:e.jsxs("div",{className:"mb-1",children:[e.jsx(F,{className:"form-label",for:"weightAsync",children:"Weight"}),e.jsx(S,{defaultValue:((Q=a==null?void 0:a.dealData[i])==null?void 0:Q.weight)||"",control:u,rules:{required:"Weight is required"},id:"weightAsync",name:"weight",render:({field:l})=>e.jsx($,{...l,type:"text",placeholder:"Weight",invalid:t.weight&&!0})}),t.weight&&e.jsx(w,{children:t.weight.message})]})})]}),e.jsxs(E,{children:[e.jsx(N,{md:"6",children:e.jsxs("div",{className:"mb-1",children:[e.jsx(F,{className:"form-label",for:"departure_countryAsync",children:"Departure Country"}),e.jsx(S,{control:u,rules:{required:"Departure country is required"},id:"departure_countryAsync",name:"departure_country",defaultValue:s&&s.find(l=>{var n;return l.id===((n=a==null?void 0:a.dealData[i])==null?void 0:n.departure_country_id)})||"",render:({field:l})=>{const n=s==null?void 0:s.find(d=>d.id===l.value);return e.jsx(L,{options:[...Array.isArray(s)?s.map(d=>({value:d.id,label:d.nicename})):[]],classNamePrefix:"select",theme:I,value:n?{value:n.id,label:n.nicename}:null,onChange:d=>{l.onChange(d.value),M(d.value)}})}}),t.departure_country&&e.jsx(w,{children:t.departure_country.message})]})}),e.jsx(N,{md:"6",children:e.jsxs("div",{className:"mb-1",children:[e.jsx(F,{className:"form-label",for:"arrival_countryAsync",children:"Arrival Country"}),e.jsx(S,{control:u,rules:{required:"Arrival country is required"},id:"arrival_countryAsync",name:"arrival_country",defaultValue:s&&s.find(l=>{var n;return l.id===((n=a==null?void 0:a.dealData[i])==null?void 0:n.arrival_country_id)})||"",render:({field:l})=>{const n=s==null?void 0:s.find(d=>d.id===l.value);return e.jsx(L,{options:[...Array.isArray(s)?s.map(d=>({value:d.id,label:d.nicename})):[]],classNamePrefix:"select",theme:I,value:n?{value:n.id,label:n.nicename}:null,onChange:d=>{l.onChange(d.value),me(d.value)}})}}),t.arrival_country&&e.jsx(w,{children:t.arrival_country.message})]})})]}),e.jsxs(E,{children:[e.jsx(N,{md:"6",children:e.jsxs("div",{className:"mb-1",children:[e.jsx(F,{className:"form-label",for:"departure_cityAsync",children:"Departure City"}),e.jsx(S,{control:u,rules:{required:"Departure city is required"},id:"departure_cityAsync",name:"departure_city",className:"my-custom-controller",render:({field:l})=>{var d;const n=x==null?void 0:x.find(q=>q.id===l.value);return e.jsxs(H,{className:"my-custom-controller",children:[e.jsx(L,{options:he.map(q=>({value:q.id,label:q.name})),classNamePrefix:"select",theme:I,value:n?{value:n.id,label:n.name}:null,onChange:q=>{l.onChange(q.value),pe(q.value)},className:t.departure_city?"is-invalid":"",components:{MenuList:_},onInputChange:q=>f(q)}),e.jsx(w,{children:(d=t.departure_city)==null?void 0:d.message})]})}})]})}),e.jsx(N,{md:"6",children:e.jsxs("div",{className:"mb-1",children:[e.jsx(F,{className:"form-label",for:"arrival_cityAsync",children:"Arrival City"}),e.jsx(S,{control:u,rules:{required:"Arrival city is required"},id:"arrival_cityAsync",name:"arrival_city",defaultValue:x&&x.find(l=>{var n;return l.id===((n=a==null?void 0:a.dealData[i])==null?void 0:n.arrival_city_id)})||"",render:({field:l})=>{const n=x==null?void 0:x.find(d=>d.id===l.value);return e.jsxs(H,{className:"my-custom-controller",children:[e.jsx(L,{options:ye.map(d=>({value:d.id,label:d.name})),classNamePrefix:"select",theme:I,value:n?{value:n.id,label:n.name}:null,onChange:d=>{l.onChange(d.value),fe(d.value)},className:t.arrival_city?"is-invalid":"",components:{MenuList:_},onInputChange:d=>f(d)}),t.arrival_city&&e.jsx(w,{children:t.arrival_city.message})]})}})]})})]}),e.jsxs(E,{children:[e.jsx(N,{md:"6",children:e.jsxs("div",{className:"mb-1",children:[e.jsx(F,{className:"form-label",for:"departure_airportAsync",children:"Departure Airport"}),e.jsx(S,{control:u,rules:{required:"Departure Airport is required"},id:"departure_airportAsync",name:"departure_airport",defaultValue:C&&C.find(l=>{var n;return l.id===((n=a==null?void 0:a.dealData[i])==null?void 0:n.departure_airport_id)})||"",render:({field:l})=>{const n=C==null?void 0:C.find(d=>d.id===l.value);return e.jsxs(H,{className:"my-custom-controller",children:[e.jsx(L,{options:ve.map(d=>({value:d.id,label:d.airport_name})),classNamePrefix:"select",theme:I,value:n?{value:n.id,label:n.airport_name}:null,onChange:d=>l.onChange(d.value),className:t.departure_airport?"is-invalid":""}),t.departure_airport&&e.jsx(w,{children:t.departure_airport.message})]})}})]})}),e.jsx(N,{md:"6",children:e.jsxs("div",{className:"mb-1",children:[e.jsx(F,{className:"form-label",for:"arrival_airportAsync",children:"Arrival Airport"}),e.jsx(S,{control:u,rules:{required:"Arrival airport is required"},id:"arrival_airportAsync",name:"arrival_airport",defaultValue:C&&C.find(l=>{var n;return l.id===((n=a==null?void 0:a.dealData[i])==null?void 0:n.arrival_airport_id)})||"",render:({field:l})=>{const n=C==null?void 0:C.find(d=>d.id===l.value);return e.jsxs(H,{className:"my-custom-controller",children:[e.jsx(L,{options:_e.map(d=>({value:d.id,label:d.airport_name})),classNamePrefix:"select",theme:I,value:n?{value:n.id,label:n.airport_name}:null,onChange:d=>l.onChange(d.value),className:t.arrival_airport?"is-invalid":""}),t.arrival_airport&&e.jsx(w,{children:t.arrival_airport.message})]})}})]})})]}),e.jsxs(E,{children:[e.jsx(N,{md:"6",children:e.jsxs("div",{className:"mb-1",children:[e.jsx(F,{className:"form-label",for:"departure_dateAsync",children:"Departure Date"}),e.jsx(S,{control:u,rules:{required:"Departure date is required"},id:"departure_dateAsync",name:"departure_date",defaultValue:((J=a==null?void 0:a.dealData[i])==null?void 0:J.departure_date)||"",render:({field:l})=>e.jsx(H,{className:"my-custom-controller",children:e.jsxs("div",{children:[e.jsx(ee,{...l,value:l.value,"data-enable-time":!0,id:"departure-picker",className:`form-control ${t.departure_date?"is-invalid":""}`,options:{dateFormat:"Y-m-d H:i:S",enableTime:!0},onChange:n=>{l.onChange(Z(n[0],"yyyy-MM-dd HH:mm:ss"))}}),t.departure_date&&e.jsx(w,{children:t.departure_date.message})]})})})]})}),e.jsx(N,{md:"6",children:e.jsxs("div",{className:"mb-1",children:[e.jsx(F,{className:"form-label",for:"arrival_dateAsync",children:"Arrival Date"}),e.jsx(S,{control:u,rules:{required:"Arrival date is required"},id:"arrival_dateAsync",name:"arrival_date",defaultValue:((K=a==null?void 0:a.dealData[i])==null?void 0:K.arrival_date)||"",render:({field:l})=>e.jsx(H,{className:"my-custom-controller",children:e.jsxs("div",{children:[e.jsx(ee,{...l,value:l.value,"data-enable-time":!0,id:"arrival-picker",className:`form-control ${t.arrival_date?"is-invalid":""}`,options:{dateFormat:"Y-m-d H:i:S",enableTime:!0},onChange:n=>{l.onChange(Z(n[0],"yyyy-MM-dd HH:mm:ss"))}}),t.arrival_date&&e.jsx(w,{children:t.arrival_date.message})]})})})]})})]}),e.jsxs(E,{children:[e.jsx(N,{md:"6",children:e.jsxs("div",{className:"mb-1",children:[e.jsx(F,{className:"form-label",for:"delivery_type",children:"Delivery Type"}),e.jsx(S,{name:"delivery_type",id:"delivery_typeAsync",defaultValue:m.find(l=>{var n;return l.value===((n=a==null?void 0:a.dealData[i])==null?void 0:n.delivery_type)}),control:u,rules:{required:"Delivery Type is required"},render:({field:l})=>e.jsx(L,{options:m,classNamePrefix:"select",theme:I,...l})}),t.delivery_type&&e.jsx(w,{children:t.delivery_type.message})]})}),e.jsx(N,{md:"6",children:e.jsxs("div",{className:"mb-1",children:[e.jsx(F,{className:"form-label",for:"statusAsync",children:"Status"}),e.jsx(S,{id:"react-select",control:u,name:"status",defaultValue:c.find(l=>{var n;return l.value===((n=a==null?void 0:a.dealData[i])==null?void 0:n.status)}),render:({field:l})=>e.jsx(L,{options:c,classNamePrefix:"select",theme:I,...l})}),t.status&&e.jsx(w,{children:t.status.message})]})})]}),e.jsxs(E,{children:[e.jsx(N,{md:"6",children:e.jsxs("div",{className:"mb-1",children:[e.jsx(F,{className:"form-label",for:"duty_free",children:"Duty Free Delivery"}),e.jsx(S,{name:"duty_free",id:"duty_freeAsync",defaultValue:j.find(l=>{var n;return l.value===((n=a==null?void 0:a.dealData[i])==null?void 0:n.duty_free)}),control:u,rules:{required:"Duty Free Field is required"},render:({field:l})=>e.jsx(L,{options:j,classNamePrefix:"select",theme:I,...l})}),t.duty_free&&e.jsx(w,{children:t.duty_free.message})]})}),e.jsx(N,{md:"6 d-flex align-items-center justify-content-center",children:e.jsx(te,{block:!0,color:"primary",disabled:W,type:"submit",className:"d-flex",children:"Submit"})})]}),e.jsx("div",{id:"loading-overlay",style:{display:W?"flex":"none"},children:e.jsx("div",{className:"loader"})})]})})]}),e.jsx(Be,{id:i})]})},Oe=({dataVersion:a})=>{const y=b.useMemo(()=>new z,[]),v=ae(),{id:i}=re(),c=V(),p=P(r=>{var o;return(o=r.useEditDealData)==null?void 0:o.dealData[i]}),f=P(r=>{var o;return(o=r.useEditDealData)==null?void 0:o.version}),_=P(r=>{var o;return(o=r.useEditDealData)==null?void 0:o.countries}),m=P(r=>{var o;return(o=r.useEditDealData)==null?void 0:o.cities}),j=P(r=>{var o;return(o=r.useEditDealData)==null?void 0:o.airports}),[u,h]=b.useState(!1);return b.useEffect(()=>{(async()=>{if(!(p&&f===a))try{c(U(!0));const g=(await y.getUserListUserDeals(i)).data;c(se(g))}catch(o){console.error("Error fetching deal data:",o),o.response.status===404&&v(ie())}finally{c(U(!1))}})()},[i,c,a,p,f,v,y]),b.useEffect(()=>{(async()=>{if(!u&&(!_.length||!m.length||!j.length))try{const o=await y.getUserAllData();o&&(_.length||c(Ne(o.data.countries)),m.length||c(Se(o.data.cities)),j.length||c(we(o.data.airports)),h(!0))}catch(o){console.error("Error fetching countries, cities, or airports:",o)}})()},[_.length,m.length,j.length,u,c,y]),null},la=()=>{const a=P(f=>f.useEditDealData),y=a==null?void 0:a.loading,v=a==null?void 0:a.loadingCountries,i=a==null?void 0:a.loadingCities,c=a==null?void 0:a.loadingAirports,p=y||v||i||c;return e.jsxs("div",{children:[e.jsx(Oe,{dataVersion:a==null?void 0:a.version}),p?e.jsx("div",{id:"loading-overlay",style:{display:"flex"},children:e.jsx("div",{className:"loader"})}):e.jsx(Ue,{dataVersion:a==null?void 0:a.version,redux:a??""})]})};export{la as default};
