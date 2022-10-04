import 'bootstrap/dist/css/bootstrap.min.css';
import { Button} from 'react-bootstrap';
import { useState,useEffect } from "react";
import { Link} from 'react-router-dom';
import { ReactComponent as KleverLogo } from './assets/logo.svg';
import { ReactComponent as StarLogo } from './assets/shooting-star.svg';


const Home=()=>{
    const [tokens,setTokens]=useState([])

useEffect(()=>{
    const jsonToken=JSON.parse(localStorage.getItem('tokens'));
    console.log(jsonToken)
    if(!jsonToken){
        const tokensArray=[]
        localStorage.setItem('tokens', JSON.stringify(tokensArray));
        setTokens([]) 
       }
       else{
        setTokens(jsonToken)
       }

},[])

    return(
       
        <div  style={{display:'flex',flexDirection:'center',gap:'3rem'}} className="container col-xl-10 col-xxl-8 px-3 py-0"> 
        <div style={{display:'flex',flex:'2'}} className="row align-items-center g-lg-5 py-5">
        <div  style={{display:'flex',flexDirection:'column',flexGap:'1rem'}} className="col-md-10 mx-auto col-lg-7"> 
        <div className='my-3' style={{display:'flex',justifyContent:'center'}}><KleverLogo style={{height:'3rem'}} /> </div>
        <div className='my-3' style={{display:'flex',justifyContent:'space-between'}}>
            <div style={{display:'flex'}}>
            <StarLogo style={{height:'3rem',color:'white'}}/>
            <h2>Wish Wallet</h2> 
            </div>
       <Link to='/add'> <Button  style={{backgroundColor:'#641864',border:'0px'}}>Add Token</Button></Link>
        </div>
<div style={{display:'flex',flexDirection:'column'}}>
<div className='my-0' style={{display:'flex',justifyContent:'space-between'}}><h5>Tokens</h5><h5>Balance</h5></div>
{tokens.map(token=>{
        return(
<div className='my-0'  style={{display:'flex',flexDirection:'row',justifyContent: 'space-between'}} >
    <div className='my-0' style={{display:'flex',flexDirection:'row',justifyContent: 'space-between'}}>
    <div className='mr-3' style={{display:'flex',alignItems: 'center',marginRight:'20px'}}>
    <Link to={{pathname:`/edit/${token.id}`}}>
<svg color='white' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg>
</Link>

</div>
    <h1 id={token.id}>{token.name}</h1>
    </div>
        <h1 >{token.balance}</h1>
</div>)
      })}
</div>
    </div>
    </div>
    </div>
    )
}

export default Home