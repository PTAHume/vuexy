import{r as b,w as e,C as ae,D as V,b as Ae,B as re,a3 as te,s as L,Q as xe}from"./index-799ec526.js";import{A as Ne,a as E,g as se,s as I}from"./App-76c3559e.js";import{u as ie,C as S}from"./index.esm-313d6863.js";import{R as H,C as N}from"./Col-740eac10.js";import{C as le}from"./Card-2b73a7fd.js";import{C as ne}from"./CardBody-5a0c752d.js";import{C as ce}from"./CardHeader-1a15b067.js";import{C as oe}from"./CardTitle-2ca3b30f.js";import{F as de}from"./Form-b15e587b.js";import{F as w}from"./FormFeedback-152d02b5.js";import{F as M,f as Z,a as Se}from"./index.esm-a79e25f0.js";import{I as z,L as F}from"./Label-7980a7d7.js";import{S as P}from"./react-select.esm-cbe66f8b.js";import{s as U,f as ue,a as we,b as Fe,c as ke}from"./dealSlice-2c1f3e28.js";import{C as qe}from"./check-786ae700.js";import{A as Ie,w as Pe,S as Le}from"./ext-component-sweet-alerts-cca615dd.js";import{F as ee}from"./flatpickr-8c5da3e1.js";import"./Fade-c46db253.js";const He=(a,y,v,i,c,p,f)=>{const _=y("departure_country"),m=y("arrival_country"),j=y("departure_city"),u=y("arrival_city");b.useEffect(()=>{(()=>{if(v&&c.dealData&&c.dealData[p]){const t=v.find(o=>o.id===c.dealData[p].departure_country_id);a("departure_country",(t==null?void 0:t.id)||"")}if(v&&c.dealData&&c.dealData[p]){const t=v.find(o=>o.id===c.dealData[p].arrival_country_id);a("arrival_country",(t==null?void 0:t.id)||"")}if(i&&c.dealData&&c.dealData[p]){const t=i.find(o=>o.id===c.dealData[p].departure_city_id);a("departure_city",(t==null?void 0:t.id)||"")}if(i&&c.dealData&&c.dealData[p]){const t=i.find(o=>o.id===c.dealData[p].arrival_city_id);a("arrival_city",(t==null?void 0:t.id)||"")}if(f&&c.dealData&&c.dealData[p]){const t=f.find(o=>o.id===c.dealData[p].arrival_airport_id);a("arrival_airport",(t==null?void 0:t.id)||"")}if(f&&c.dealData&&c.dealData[p]){const t=f.find(o=>o.id===c.dealData[p].departure_airport_id);a("departure_airport",(t==null?void 0:t.id)||"")}})()},[v,f,i,c.dealData,p,a]),b.useEffect(()=>{if(i&&_){const h=i.find(t=>t.country_id===_);a("departure_city",(h==null?void 0:h.id)||"")}},[i,_,a]),b.useEffect(()=>{if(i&&m){const h=i.find(t=>t.country_id===m);a("arrival_city",(h==null?void 0:h.id)||"")}},[i,m,a]),b.useEffect(()=>{if(f&&j){const h=f.find(t=>t.city_id===j);a("departure_airport",(h==null?void 0:h.id)||"")}},[f,j,a]),b.useEffect(()=>{if(f&&u){const h=f.find(t=>t.city_id===u);a("arrival_airport",(h==null?void 0:h.id)||"")}},[f,u,a])},Me=(a,y,v,i,c,p,f,_)=>{const[m,j]=b.useState([]),[u,h]=b.useState([]),[t,o]=b.useState([]),[g,r]=b.useState([]),s=A=>{if(A){const D=a.filter(k=>k.country_id===A);if(j(D),D.length>0){const k=y.filter(R=>R.city_id===D[0].id);o(k)}else o([])}},x=A=>{if(A){const D=a.filter(k=>k.country_id===A);if(h(D),D.length>0){const k=y.filter(R=>R.city_id===D[0].id);r(k)}else r([])}},C=A=>{A&&v("user_id",A)},B=A=>{if(A){const D=y.filter(k=>k.city_id===A);o(D),D.length>0?v("departure_airport",D[0].id):v("departure_airport","")}else o([])},T=A=>{if(A){const D=y.filter(k=>k.city_id===A);r(D),D.length>0?v("arrival_airport",D[0].id):v("arrival_airport","")}else r([])};return b.useEffect(()=>{i&&s(i.id),f&&x(f.id),_&&C(_.id),c&&B(c.id),p&&T(p.id)},[i,f,c,p,_]),{handleDepartureCountryChange:s,handleArrivalCountryChange:x,handleUserChange:C,filteredDepartureCities:m,filteredArrivalCities:u,filteredDepartureAirports:t,handleDepartureCityChange:B,handleArrivalCityChange:T,filteredArrivalAirports:g}},Re=(a,y,v,i,c,p,f,_,m)=>{const[j,u]=b.useState(!1);return{onSubmit:async t=>{u(!0);const o=r=>{const s=["Select City","Select Country","Select Airport",""," ","Select..."];return typeof r=="object"?r!=null&&Object.keys(r).length>0:typeof r!="object"&&r.toString().length>0&&!s.includes(r)};if(Object.values(t).every(o)&&(!y||Object.keys(y).length===0)){console.log(t.duty_free.value);try{const r={id:v,arrival_airport_id:t.arrival_airport,arrival_city_id:t.arrival_city,arrival_country_id:t.arrival_country,delivery_type:t.delivery_type.value,departure_airport_id:t.departure_airport,departure_city_id:t.departure_city,departure_country_id:t.departure_country,flight_number:t.flight_number,price:t.price,user_id:t.user_id,weight:t.weight,status:t.status.value,departure_date:t.departure_date,arrival_date:t.arrival_date,duty_free:t.duty_free.value,user_authenticated:t.user_authenticated.value},s=await c.updateDeal(r,v);s.status===201&&(u(!1),localStorage.setItem("lastUpdated",Date.now()),p(f(s.data)),_(e.jsxs("div",{className:"d-flex",children:[e.jsx("div",{className:"me-1",children:e.jsx(Ne,{size:"sm",color:"success",icon:e.jsx(qe,{size:12})})}),e.jsxs("div",{className:"d-flex flex-column",children:[e.jsx("h6",{children:"Form Submitted!"}),e.jsx("div",{}),e.jsx("span",{children:"You have successfully updated the Deal details!"})]})]})))}catch(r){if(console.log(r),u(!1),r.response&&r.response.status===422){const s=r.response.data.errors;s.user_name?m("user_name",{type:"manual",message:s.user_name?s.user_name:"Incorrect username"}):s.paflightssword?m("flight",{type:"manual",message:s.flight?s.flight:"Incorrect flight"}):s.delivery_type?m("delivery_type",{type:"manual",message:s.delivery_type?s.delivery_type:"Incorrect delivery type"}):s.price?m("price",{type:"manual",message:s.price?s.price:"Incorrect price"}):s.weight?m("weight",{type:"manual",message:s.weight?s.weight:"Incorrect weight"}):s.departure_airport?m("departure_airport",{type:"manual",message:s.departure_airport?s.departure_airport:"Incorrect departure airport"}):s.arrival_airport?m("arrival_airport",{type:"manual",message:s.arrival_airport?s.arrival_airport:"Incorrect arrival airport"}):s.departure_country?m("departure_country",{type:"manual",message:s.departure_country?s.departure_country:"Incorrect country"}):s.arrival_country?m("arrival_country",{type:"manual",message:s.arrival_country?s.arrival_country:"Incorrect country"}):s.departure_city?m("departure_city",{type:"manual",message:s.departure_city?s.departure_city:"Incorrect city"}):s.arrival_city?m("arrival_city",{type:"manual",message:s.arrival_city?s.arrival_city:"Incorrect city"}):s.arrival_date?m("arrival_date",{type:"manual",message:s.arrival_date?s.arrival_date:"Incorrect date"}):s.departure_date?m("departure_date",{type:"manual",message:s.departure_date?s.departure_date:"Incorrect date"}):s.status&&m("status",{type:"manual",message:s.status?s.status:"Incorrect correct status"})}else console.error("Unexpected error:",r)}}else for(const r in t)if(!o(t[r])){const s=t[r]===""||typeof t[r]=="object"&&Object.keys(t[r]).length===0?`The ${r} field has no available options.`:`The ${r} field is required.`;m(r,{type:"manual",message:s})}},isLoading:j,setIsLoading:u}},Be={confirmCheckbox:!1},O=Pe(Le),Te=({id:a})=>{const y=E(),v=ae(),i=new V,{control:c,setError:p,handleSubmit:f,formState:{errors:_}}=ie({defaultValues:Be}),m=async()=>{const u=await O.fire({title:"Are you sure?",text:"Are you sure you would like to delete the deal?",icon:"warning",showCancelButton:!0,confirmButtonText:"Yes, delete it!",customClass:{confirmButton:"btn btn-primary",cancelButton:"btn btn-danger ms-1"},buttonsStyling:!1});if(u.value)try{y(U(!0)),await i.deleteDeal(a),y(U(!1)),O.fire({icon:"success",title:"Deleted!",text:"Your account has been deactivated.",customClass:{confirmButton:"btn btn-success"}}),v(se())}catch(h){console.log(h)}else u.dismiss===O.DismissReason.cancel&&O.fire({title:"Cancelled",text:"Deletion Cancelled!!",icon:"error",customClass:{confirmButton:"btn btn-success"}})},j=u=>{u.confirmCheckbox===!0?m():p("confirmCheckbox",{type:"manual"})};return e.jsxs(le,{children:[e.jsx(ce,{className:"border-bottom",children:e.jsx(oe,{tag:"h4",children:"Delete Deal"})}),e.jsxs(ne,{className:"py-2 my-25",children:[e.jsxs(Ie,{color:"warning",children:[e.jsx("h4",{className:"alert-heading",children:"Are you sure you want to delete a deal?"}),e.jsx("div",{className:"alert-body fw-normal",children:"Once you delete your deal, there is no going back. Please be certain."})]}),e.jsxs(de,{onSubmit:f(j),children:[e.jsxs("div",{className:"form-check",children:[e.jsx(S,{control:c,name:"confirmCheckbox",render:({field:u})=>e.jsx(z,{...u,type:"checkbox",id:"confirmCheckbox",checked:u.value,invalid:_.confirmCheckbox&&!0})}),e.jsx(F,{for:"confirmCheckbox",className:Ae("form-check-label",{"text-danger":_==null?void 0:_.confirmCheckbox}),children:"I confirm to delete the deal"}),(_==null?void 0:_.confirmCheckbox)&&e.jsx(w,{children:"Please confirm that you want to delete a deal"})]}),e.jsx("div",{className:"mt-1",children:e.jsx(re,{color:"danger",children:"Delete Deal"})})]})]})]})},Oe=(a,y,v,i,c)=>{var t,o;const p=a.find(g=>{var r;return g.id===((r=i==null?void 0:i.dealData[c])==null?void 0:r.departure_country_id)}),f=a.find(g=>{var r;return g.id===((r=i==null?void 0:i.dealData[c])==null?void 0:r.arrival_country_id)}),_=y.find(g=>{var r;return g.id===((r=i==null?void 0:i.dealData[c])==null?void 0:r.departure_city_id)}),m=y.find(g=>{var r;return g.id===((r=i==null?void 0:i.dealData[c])==null?void 0:r.arrival_city_id)}),j=v.find(g=>{var r;return g.id===((r=i==null?void 0:i.dealData[c])==null?void 0:r.departure_airport_id)}),u=v.find(g=>{var r;return g.id===((r=i==null?void 0:i.dealData[c])==null?void 0:r.arrival_airport_id)}),h=((o=(t=i.dealData[c])==null?void 0:t.user)==null?void 0:o.find(g=>{var r;return g.id===((r=i==null?void 0:i.dealData[c])==null?void 0:r.user_id.id)}))||null;return{defaultDepartureCountry:p,defaultArrivalCountry:f,defaultDepartureCity:_,defaultArrivalCity:m,defaultDepartureAirport:j,defaultArrivalAirport:u,defaultUser:h}},Ue=({redux:a})=>{var G,Q,J,K;const y=E(),v=new V,{id:i}=te(),c=[{value:"approved",label:"Approved"},{value:"pending",label:"Pending"},{value:"rejected",label:"Rejected"}],[p,f]=b.useState(""),_=l=>{const{options:n,children:d,maxHeight:q,getValue:je}=l,[De]=je(),be=n.indexOf(De)*35,Y=p&&!n.some($=>$.label.toLowerCase().includes(p.toLowerCase())),Ce=Y?65:q;render(e.jsx(Se,{height:Ce,itemCount:Y?1:d.length,itemSize:35,initialScrollOffset:be,width:"100%",children:({index:$,style:X})=>e.jsx("div",{style:X,children:Y?e.jsx("div",{style:{...X,textAlign:"center"},children:"No Option"}):d[$]})}))},m=[{value:"hand_luggage",label:"Hand Luggage"},{value:"baggage",label:"Baggage"},{value:"document",label:"Document"}],j=[{value:0,label:"Inactive"},{value:1,label:"Active"}],{control:u,setValue:h,setError:t,watch:o,handleSubmit:g,formState:{errors:r}}=ie(),s=L(l=>l.dealData.countries),x=L(l=>l.dealData.cities),C=L(l=>l.dealData.airports);He(h,o,s,x,a,i,C);const{defaultDepartureCountry:B,defaultDepartureCity:T,defaultArrivalCity:A,defaultArrivalCountry:D,defaultUser:k}=Oe(s,x,C,a,i),{handleDepartureCountryChange:R,handleArrivalCountryChange:me,handleDepartureCityChange:pe,handleArrivalCityChange:fe,filteredDepartureCities:he,filteredArrivalCities:ye,filteredDepartureAirports:ve,filteredArrivalAirports:_e}=Me(x,C,h,B,T,A,D,k),{onSubmit:ge,isLoading:W}=Re(g,r,i,a,v,y,ue,xe,t);return e.jsxs(b.Fragment,{children:[e.jsxs(le,{children:[e.jsx(ce,{className:"border-bottom",children:e.jsx(oe,{tag:"h4",children:"Edit Deal Details"})}),e.jsx(ne,{className:"py-2 my-25",children:e.jsxs(de,{className:"mt-2 pt-50",onSubmit:g(ge),children:[e.jsxs(H,{children:[e.jsx(N,{md:"6",children:e.jsxs("div",{className:"mb-1",children:[e.jsx(F,{className:"form-label",for:"priceAsync",children:"Price"}),e.jsx(S,{defaultValue:a.dealData&&((G=a.dealData[i])==null?void 0:G.price)||"",control:u,rules:{required:"Price is required"},id:"priceAsync",name:"price",render:({field:l})=>e.jsx(z,{...l,type:"number",placeholder:"Price",invalid:r.price&&!0})}),r.price&&e.jsx(w,{children:r.price.message})]})}),e.jsx(N,{md:"6",children:e.jsxs("div",{className:"mb-1",children:[e.jsx(F,{className:"form-label",for:"weightAsync",children:"Weight"}),e.jsx(S,{defaultValue:a.dealData&&((Q=a.dealData[i])==null?void 0:Q.weight)||"",control:u,rules:{required:"Weight is required"},id:"weightAsync",name:"weight",render:({field:l})=>e.jsx(z,{...l,type:"text",placeholder:"Weight",invalid:r.weight&&!0})}),r.weight&&e.jsx(w,{children:r.weight.message})]})})]}),e.jsxs(H,{children:[e.jsx(N,{md:"6",children:e.jsxs("div",{className:"mb-1",children:[e.jsx(F,{className:"form-label",for:"departure_countryAsync",children:"Departure Country"}),e.jsx(S,{control:u,rules:{required:"Departure country is required"},id:"departure_countryAsync",name:"departure_country",defaultValue:s&&s.find(l=>{var n;return l.id===((n=a==null?void 0:a.dealData[i])==null?void 0:n.departure_country_id)})||"",render:({field:l})=>{const n=s==null?void 0:s.find(d=>d.id===l.value);return e.jsx(P,{options:[...Array.isArray(s)?s.map(d=>({value:d.id,label:d.nicename})):[]],classNamePrefix:"select",theme:I,value:n?{value:n.id,label:n.nicename}:null,onChange:d=>{l.onChange(d.value),R(d.value)}})}}),r.departure_country&&e.jsx(w,{children:r.departure_country.message})]})}),e.jsx(N,{md:"6",children:e.jsxs("div",{className:"mb-1",children:[e.jsx(F,{className:"form-label",for:"arrival_countryAsync",children:"Arrival Country"}),e.jsx(S,{control:u,rules:{required:"Arrival country is required"},id:"arrival_countryAsync",name:"arrival_country",defaultValue:s&&s.find(l=>{var n;return l.id===((n=a==null?void 0:a.dealData[i])==null?void 0:n.arrival_country_id)})||"",render:({field:l})=>{const n=s==null?void 0:s.find(d=>d.id===l.value);return e.jsx(P,{options:[...Array.isArray(s)?s.map(d=>({value:d.id,label:d.nicename})):[]],classNamePrefix:"select",theme:I,value:n?{value:n.id,label:n.nicename}:null,onChange:d=>{l.onChange(d.value),me(d.value)}})}}),r.arrival_country&&e.jsx(w,{children:r.arrival_country.message})]})})]}),e.jsxs(H,{children:[e.jsx(N,{md:"6",children:e.jsxs("div",{className:"mb-1",children:[e.jsx(F,{className:"form-label",for:"departure_cityAsync",children:"Departure City"}),e.jsx(S,{control:u,rules:{required:"Departure city is required"},id:"departure_cityAsync",name:"departure_city",className:"my-custom-controller",render:({field:l})=>{var d;const n=x==null?void 0:x.find(q=>q.id===l.value);return e.jsxs(M,{className:"my-custom-controller",children:[e.jsx(P,{options:he.map(q=>({value:q.id,label:q.name})),classNamePrefix:"select",theme:I,value:n?{value:n.id,label:n.name}:null,onChange:q=>{l.onChange(q.value),pe(q.value)},className:r.departure_city?"is-invalid":"",components:{MenuList:_},onInputChange:q=>f(q)}),e.jsx(w,{children:(d=r.departure_city)==null?void 0:d.message})]})}})]})}),e.jsx(N,{md:"6",children:e.jsxs("div",{className:"mb-1",children:[e.jsx(F,{className:"form-label",for:"arrival_cityAsync",children:"Arrival City"}),e.jsx(S,{control:u,rules:{required:"Arrival city is required"},id:"arrival_cityAsync",name:"arrival_city",defaultValue:x&&x.find(l=>{var n;return l.id===((n=a==null?void 0:a.dealData[i])==null?void 0:n.arrival_city_id)})||"",render:({field:l})=>{const n=x==null?void 0:x.find(d=>d.id===l.value);return e.jsxs(M,{className:"my-custom-controller",children:[e.jsx(P,{options:ye.map(d=>({value:d.id,label:d.name})),classNamePrefix:"select",theme:I,value:n?{value:n.id,label:n.name}:null,onChange:d=>{l.onChange(d.value),fe(d.value)},className:r.arrival_city?"is-invalid":"",components:{MenuList:_},onInputChange:d=>f(d)}),r.arrival_city&&e.jsx(w,{children:r.arrival_city.message})]})}})]})})]}),e.jsxs(H,{children:[e.jsx(N,{md:"6",children:e.jsxs("div",{className:"mb-1",children:[e.jsx(F,{className:"form-label",for:"departure_airportAsync",children:"Departure Airport"}),e.jsx(S,{control:u,rules:{required:"Departure Airport is required"},id:"departure_airportAsync",name:"departure_airport",defaultValue:C&&C.find(l=>{var n;return l.id===((n=a==null?void 0:a.dealData[i])==null?void 0:n.departure_airport_id)})||"",render:({field:l})=>{const n=C==null?void 0:C.find(d=>d.id===l.value);return e.jsxs(M,{className:"my-custom-controller",children:[e.jsx(P,{options:ve.map(d=>({value:d.id,label:d.airport_name})),classNamePrefix:"select",theme:I,value:n?{value:n.id,label:n.airport_name}:null,onChange:d=>l.onChange(d.value),className:r.departure_airport?"is-invalid":""}),r.departure_airport&&e.jsx(w,{children:r.departure_airport.message})]})}})]})}),e.jsx(N,{md:"6",children:e.jsxs("div",{className:"mb-1",children:[e.jsx(F,{className:"form-label",for:"arrival_airportAsync",children:"Arrival Airport"}),e.jsx(S,{control:u,rules:{required:"Arrival airport is required"},id:"arrival_airportAsync",name:"arrival_airport",defaultValue:C&&C.find(l=>{var n;return l.id===((n=a==null?void 0:a.dealData[i])==null?void 0:n.arrival_airport_id)})||"",render:({field:l})=>{const n=C==null?void 0:C.find(d=>d.id===l.value);return e.jsxs(M,{className:"my-custom-controller",children:[e.jsx(P,{options:_e.map(d=>({value:d.id,label:d.airport_name})),classNamePrefix:"select",theme:I,value:n?{value:n.id,label:n.airport_name}:null,onChange:d=>l.onChange(d.value),className:r.arrival_airport?"is-invalid":""}),r.arrival_airport&&e.jsx(w,{children:r.arrival_airport.message})]})}})]})})]}),e.jsxs(H,{children:[e.jsx(N,{md:"6",children:e.jsxs("div",{className:"mb-1",children:[e.jsx(F,{className:"form-label",for:"departure_dateAsync",children:"Departure Date"}),e.jsx(S,{control:u,rules:{required:"Departure date is required"},id:"departure_dateAsync",name:"departure_date",defaultValue:((J=a==null?void 0:a.dealData[i])==null?void 0:J.departure_date)||"",render:({field:l})=>e.jsx(M,{className:"my-custom-controller",children:e.jsxs("div",{children:[e.jsx(ee,{...l,value:l.value,"data-enable-time":!0,id:"departure-picker",className:`form-control ${r.departure_date?"is-invalid":""}`,options:{dateFormat:"Y-m-d H:i:S",enableTime:!0},onChange:n=>{l.onChange(Z(n[0],"yyyy-MM-dd HH:mm:ss"))}}),r.departure_date&&e.jsx(w,{children:r.departure_date.message})]})})})]})}),e.jsx(N,{md:"6",children:e.jsxs("div",{className:"mb-1",children:[e.jsx(F,{className:"form-label",for:"arrival_dateAsync",children:"Arrival Date"}),e.jsx(S,{control:u,rules:{required:"Arrival date is required"},id:"arrival_dateAsync",name:"arrival_date",defaultValue:((K=a==null?void 0:a.dealData[i])==null?void 0:K.arrival_date)||"",render:({field:l})=>e.jsx(M,{className:"my-custom-controller",children:e.jsxs("div",{children:[e.jsx(ee,{...l,value:l.value,"data-enable-time":!0,id:"arrival-picker",className:`form-control ${r.arrival_date?"is-invalid":""}`,options:{dateFormat:"Y-m-d H:i:S",enableTime:!0},onChange:n=>{l.onChange(Z(n[0],"yyyy-MM-dd HH:mm:ss"))}}),r.arrival_date&&e.jsx(w,{children:r.arrival_date.message})]})})})]})})]}),e.jsxs(H,{children:[e.jsx(N,{md:"6",children:e.jsxs("div",{className:"mb-1",children:[e.jsx(F,{className:"form-label",for:"delivery_type",children:"Delivery Type"}),e.jsx(S,{name:"delivery_type",id:"delivery_typeAsync",defaultValue:m.find(l=>{var n;return l.value===((n=a==null?void 0:a.dealData[i])==null?void 0:n.delivery_type)}),control:u,rules:{required:"Delivery Type is required"},render:({field:l})=>e.jsx(P,{options:m,classNamePrefix:"select",theme:I,...l})}),r.delivery_type&&e.jsx(w,{children:r.delivery_type.message})]})}),e.jsx(N,{md:"6",children:e.jsxs("div",{className:"mb-1",children:[e.jsx(F,{className:"form-label",for:"statusAsync",children:"Status"}),e.jsx(S,{id:"react-select",control:u,name:"status",defaultValue:c.find(l=>{var n;return l.value===((n=a==null?void 0:a.dealData[i])==null?void 0:n.status)}),render:({field:l})=>e.jsx(P,{options:c,classNamePrefix:"select",theme:I,...l})}),r.status&&e.jsx(w,{children:r.status.message})]})})]}),e.jsxs(H,{children:[e.jsx(N,{md:"6",children:e.jsxs("div",{className:"mb-1",children:[e.jsx(F,{className:"form-label",for:"duty_free",children:"Duty Free Delivery"}),e.jsx(S,{name:"duty_free",id:"duty_freeAsync",defaultValue:j.find(l=>{var n;return l.value===((n=a==null?void 0:a.dealData[i])==null?void 0:n.duty_free)}),control:u,rules:{required:"Duty Free Field is required"},render:({field:l})=>e.jsx(P,{options:j,classNamePrefix:"select",theme:I,...l})}),r.duty_free&&e.jsx(w,{children:r.duty_free.message})]})}),e.jsx(N,{md:"6 d-flex align-items-center justify-content-center",children:e.jsx(re,{block:!0,color:"primary",disabled:W,type:"submit",className:"d-flex",children:"Submit"})})]}),e.jsx("div",{id:"loading-overlay",style:{display:W?"flex":"none"},children:e.jsx("div",{className:"loader"})})]})})]}),e.jsx(Te,{id:i})]})},Ye=({dataVersion:a})=>{const y=b.useMemo(()=>new V,[]),v=ae(),{id:i}=te(),c=E(),p=L(t=>{var o;return(o=t.dealData)==null?void 0:o.dealData[i]}),f=L(t=>{var o;return(o=t.dealData)==null?void 0:o.version}),_=L(t=>{var o;return(o=t.dealData)==null?void 0:o.countries}),m=L(t=>{var o;return(o=t.dealData)==null?void 0:o.cities}),j=L(t=>{var o;return(o=t.dealData)==null?void 0:o.airports}),[u,h]=b.useState(!1);return b.useEffect(()=>{(async()=>{if(!(p&&f===a))try{c(U(!0));const g=(await y.getUserDealData(i)).data[0];c(ue(g))}catch(o){console.error("Error fetching deal data:",o),o.response.status===404&&v(se())}finally{c(U(!1))}})()},[i,c,a,p,f,v,y]),b.useEffect(()=>{(async()=>{if(!u&&(!_.length||!m.length||!j.length))try{const o=await y.getAllUserData();o&&(_.length||c(we(o.data.countries)),m.length||c(Fe(o.data.cities)),j.length||c(ke(o.data.airports)),h(!0))}catch(o){console.error("Error fetching countries, cities, or airports:",o)}})()},[_.length,m.length,j.length,u,c,y]),null},na=()=>{const a=L(f=>f.dealData),y=a==null?void 0:a.loading,v=a==null?void 0:a.loadingCountries,i=a==null?void 0:a.loadingCities,c=a==null?void 0:a.loadingAirports,p=y||v||i||c;return e.jsxs("div",{children:[e.jsx(Ye,{dataVersion:a==null?void 0:a.version}),p?e.jsx("div",{id:"loading-overlay",style:{display:"flex"},children:e.jsx("div",{className:"loader"})}):e.jsx(Ue,{dataVersion:a==null?void 0:a.version,redux:a??""})]})};export{na as default};