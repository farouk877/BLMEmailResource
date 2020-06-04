import React, { Component } from 'react';
import './App.css';
import { Button } from 'antd';
import { MailOutlined, LinkedinFilled, InstagramOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { Typography } from 'antd';
const { Title, Text } = Typography;


class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  creditClicked() {
    var x = document.getElementById("creditMessage").style;
    if (x.display === "none" || x.display === '') {
      x.display = "inline-block";
    } else {
      x.display = "none";
    }
  }

  render() {
    return (
      <>
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          
        </header> */}
  
  
        <div className="parentContainer">
          <div>
            <Title level={3}>Black. Lives. Matter.</Title>
          </div>
          <div>
            <Text>Click the buttons below to auto-generate emails to organizations and officials that can actually make change!</Text>
            <br/><br/>
            <Text>1. Click "Email" buttons below.</Text>
            <br/>
            <Text>2. Send the email.</Text>
            <br/>
            <Text copyable={{text: 'https://www.bitly.com/blmemails'}}>3. Share this link with friends!</Text>
            <br/>
            <Text>(Use above icon to copy, or 'bit.ly/blmemails')</Text><br/><br/>
            <Text>Estimated Completion Time: </Text><Text strong>15-30 seconds</Text>
            <br/>
            <Text>EDIT: SOME EMAIL ADDRESSES WILL REJECT YOUR EMAILS.
              That's okay. Inboxes are being deleted to ignore our messages.
              We will be updating email templates consistently.
              If the emails bounce, don't worry. Thanks!</Text><br/><br/>
          </div>
          <div className="emailButtonDiv">
            <a href="https://bit.ly/blmemail">
              <Button type="primary" shape="round" icon={<MailOutlined />} size="large">
                  Email 1
              </Button>
            </a>
          </div>
          <div className="emailButtonDiv">
            <a href="https://bit.ly/blmemailB1">
              <Button type="primary" shape="round" icon={<MailOutlined />} size="large">
                  Email 2
              </Button>
            </a>
          </div>
          <div className="emailButtonDiv">
            <a href="https://bit.ly/blmemailC1">
              <Button type="primary" shape="round" icon={<MailOutlined />} size="large">
                  Email 3
              </Button>
            </a>
          </div>
          <div className="emailButtonDiv">
            <a href="https://bit.ly/blmemailD">
              <Button type="primary" shape="round" icon={<MailOutlined />} size="large">
                  Email 4
              </Button>
            </a>
          </div>
          <div className="emailButtonDiv">
            <a href="https://bit.ly/blmemailE">
              <Button type="primary" shape="round" icon={<MailOutlined />} size="large">
                  Email 5
              </Button>
            </a>
          </div>

          <div className="contact">
            <Text>
              If you have relevent emails or templates you think we should add, please email:
            </Text><br/>
            <Text copyable={{text: 'blmquickemails@gmail.com'}}>blmquickemails@gmail.com</Text>
          </div>
  
          

          <div className="creditsSection">
            <div>
              <span id="creditButton" onClick={this.creditClicked}>
                <Text code>Credits</Text>
              </span>
            </div>
            <div id="creditMessage">
              <Text>
                Created by:<br/>

                Farouk Marhaba &nbsp;<a href="https://www.linkedin.com/in/faroukmarhaba/" target="_blank" rel="noopener noreferrer">
                <LinkedinFilled className="bottomIcons"/>
                </a>&nbsp;&nbsp;
                <a href="https://www.instagram.com/farouk877/" target="_blank" rel="noopener noreferrer">
                <InstagramOutlined className="bottomIcons"/>
                </a><br/> 

                Judee Channaoui &nbsp;<a href="https://www.linkedin.com/in/judee-channaoui-855a1b171/" target="_blank" rel="noopener noreferrer">
                <LinkedinFilled className="bottomIcons"/>
                </a>&nbsp;&nbsp;
                <a href="https://www.instagram.com/ju.d.e.e/" target="_blank" rel="noopener noreferrer">
                <InstagramOutlined className="bottomIcons"/>
                </a><br/> 

              </Text>
            </div>
          </div>
            
            
            
  
  
           
  
          </div>
        
  
      </div>
      </>
    );
  }


}






// function App() {
//   return (
//     <div className="App">
//       {/* <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
        
//       </header> */}


//       <div className="parentContainer">
//         <div>
//           <Title level={3}>Black. Lives. Matter.</Title>
//         </div>
//         <div>
//           <Text>Click the buttons below to auto-generate emails to organizations and officials that can actually make change!</Text>
//           <br/><br/>
//           <Text>1. Click "Send Email" button</Text>
//           <br/>
//           <Text>2. Send the email</Text>
//           <br/>
//           <Text copyable={{text: 'linkishere'}}>3. Share this link with friends!</Text>
//           <br/><br/>
//         </div>
//         <div className="emailButtonDiv">
//           <a href="https://bit.ly/blmemail">
//             <Button type="primary" shape="round" icon={<MailOutlined />} size="large">
//                 Email 1
//             </Button>
//           </a>
//         </div>
//         <div className="emailButtonDiv">
//           <Button type="primary" shape="round" icon={<MailOutlined />} size="large">
//               Email 2
//           </Button>
//         </div>
//         <div className="emailButtonDiv">
//           <Button type="primary" shape="round" icon={<MailOutlined />} size="large">
//               Email 3
//           </Button>
//         </div>

//         <div>
//           <Text>Created by: Farouk Marhaba and Judee Channaoui</Text>
//         </div>

//         <div className="footerzzzz">
//           <Text>
//             Created by: Farouk Marhaba &nbsp;<a href="https://www.linkedin.com/in/faroukmarhaba/" target="_blank" rel="noopener noreferrer">
//               <LinkedinFilled className="bottomIcons"/>
//               </a><br/> 
//               and Judee Channaoui &nbsp;<a href="https://www.linkedin.com/in/faroukmarhaba/" target="_blank" rel="noopener noreferrer">
//               <LinkedinFilled className="bottomIcons"/>
//               </a><br/> 
//           </Text>
//         </div>



//         <div >
//             <div >
//               <div >
//                 <a href="https://www.linkedin.com/in/faroukmarhaba/" target="_blank"><span ></span></a>
//               </div>
//             </div>
//             <div >
//               <div >
//                 <p>
//                 &copy; 2020 Farouk Marhaba  |  <span><a onClick={creditsDivToggle()}>Credits</a></span>
//                 </p>
//               </div>
//             </div>
//             <div >
//               <div id="creditDiv">
//                 This website was created by <a href="https://www.linkedin.com/in/faroukmarhaba/">Farouk Marhaba</a> and <a href="https://colorlib.com">Colorlib Bootstrap</a>
//               </div>
//             </div>
//           </div>
          
          


         

//         </div>
      

//     </div>
//   );
// }


export default App;
