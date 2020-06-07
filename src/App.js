import React, { Component } from 'react';
import './App.css';
import { Button, Input, AutoComplete, Select, Alert, Collapse } from 'antd';
import { MailOutlined, LinkedinFilled, InstagramOutlined, MessageOutlined, 
  CheckCircleOutlined, PushpinOutlined, CheckOutlined, PhoneOutlined, DollarOutlined, 
  QuestionCircleOutlined, DatabaseOutlined, ArrowsAltOutlined, ReadOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { Typography } from 'antd';
import blmcallscriptpdf from './blmcallscript.pdf';
import getRepInfo from './handler.js';
const { Title, Text } = Typography;
const { Panel } = Collapse;
let reps = require('./jsonfiles/representativesCleaned.json');
let districtsfile = require('./jsonfiles/districts.json');
var zipcodes = require('zipcodes');
var finder = require('congressional-district-finder');
// let h = require('./handler.js');
const GREEN = '#009100';
const LIGHTGRAY = '#c8c8c8';
const ORANGE = '#f0a400';
const BLUE = '#3474eb';
const RED = '#eb3434';





class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      zipcode:'',
      zipcodeStatus: LIGHTGRAY,
      policymakerBoxVisible: 'hidden',
      repinfoMessage: '',
      getInfoIsLoading: false,
    };
    // this.onTextboxChangePhoneNumber = this.onTextboxChangePhoneNumber.bind(this);
    this.onTextboxChangeZipcode = this.onTextboxChangeZipcode.bind(this);
    // this.onTextboxChangeTimePreference = this.onTextboxChangeTimePreference.bind(this);
    this.onClickToFindReps = this.onClickToFindReps.bind(this);
    // this.unsubscribeClicked = this.unsubscribeClicked.bind(this);
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

  async onClickToFindReps(event) {
    // Grab state of inputs
    const {
      zipcode,
      policymakerBoxVisible,
      repinfoMessage,
      getInfoIsLoading
    } = this.state;

    this.setState({
      getInfoIsLoading: true
    });

    var repinfo = await getRepInfo(zipcode);
    if (repinfo.name) {
      var repname = repinfo.name;
      var repdistrict = repinfo.district;
      var repphone = repinfo.phonenumber;
      var str = "Name: " + repname + "\nDistrict: " + repdistrict + "\nPhone: " + repphone;
      this.setState({
        repinfoMessage: str,
        policymakerBoxVisible: 'visible'
      });
    } else {
      this.setState({
        repinfoMessage: 'Invalid Zipcode',
        policymakerBoxVisible: 'visible'
      });
    }
    this.setState({
      getInfoIsLoading: false
    });
  }

  onTextboxChangeZipcode(event) {
    var ph = event.target.value.replace(/\D/g,'').substring(0,5);
    event.target.value = ph;
    this.setState({
      zipcode: event.target.value
    });
    if (event.target.value.length === 5) {
      this.setState({
        zipcodeStatus: GREEN
      });
    } else if (event.target.value.length !== 0 && event.target.value.length !== 5) {
      this.setState({
        zipcodeStatus: ORANGE
      });
    } else {
      this.setState({
        zipcodeStatus: LIGHTGRAY
      });
    }
  }
  
  render() {
    const options = [
      {
          value: "Alabama"
      },
      {
          value: "Alaska"
      },
      {
          value: "American Samoa"
      },
      {
          value: "Arizona"
      },
      {
          value: "Arkansas"
      },
      {
          value: "California"
      },
      {
          value: "Colorado"
      },
      {
          value: "Connecticut"
      },
      {
          value: "Delaware"
      },
      {
          value: "District Of Columbia"
      },
      {
          value: "Federated States Of Micronesia"
      },
      {
          value: "Florida"
      },
      {
          value: "Georgia"
      },
      {
          value: "Guam"
      },
      {
          value: "Hawaii"
      },
      {
          value: "Idaho"
      },
      {
          value: "Illinois"
      },
      {
          value: "Indiana"
      },
      {
          value: "Iowa"
      },
      {
          value: "Kansas"
      },
      {
          value: "Kentucky"
      },
      {
          value: "Louisiana"
      },
      {
          value: "Maine"
      },
      {
          value: "Marshall Islands"
      },
      {
          value: "Maryland"
      },
      {
          value: "Massachusetts"
      },
      {
          value: "Michigan"
      },
      {
          value: "Minnesota"
      },
      {
          value: "Mississippi"
      },
      {
          value: "Missouri"
      },
      {
          value: "Montana"
      },
      {
          value: "Nebraska"
      },
      {
          value: "Nevada"
      },
      {
          value: "New Hampshire"
      },
      {
          value: "New Jersey"
      },
      {
          value: "New Mexico"
      },
      {
          value: "New York"
      },
      {
          value: "North Carolina"
      },
      {
          value: "North Dakota"
      },
      {
          value: "Northern Mariana Islands"
      },
      {
          value: "Ohio"
      },
      {
          value: "Oklahoma"
      },
      {
          value: "Oregon"
      },
      {
          value: "Palau"
      },
      {
          value: "Pennsylvania"
      },
      {
          value: "Puerto Rico"
      },
      {
          value: "Rhode Island"
      },
      {
          value: "South Carolina"
      },
      {
          value: "South Dakota"
      },
      {
          value: "Tennessee"
      },
      {
          value: "Texas"
      },
      {
          value: "Utah"
      },
      {
          value: "Vermont"
      },
      {
          value: "Virgin Islands"
      },
      {
          value: "Virginia"
      },
      {
          value: "Washington"
      },
      {
          value: "West Virginia"
      },
      {
          value: "Wisconsin"
      },
      {
          value: "Wyoming"
      }
    ];

    const { 
      zipcode,
      zipcodeStatus,
      policymakerBoxVisible,
      repinfoMessage,
      getInfoIsLoading
    } = this.state;

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
            <Collapse defaultActiveKey={['1']}>
              <Panel header={<span><Title level={3}>Black. Lives. Matter.</Title><Text style={{fontSize:17.5}}>Resource Guide</Text></span>} key="0" showArrow={false} disabled>
              </Panel>        
              <Panel header={<Title level={4} keyboard>Directions</Title>} key="1" showArrow={false} disabled>
                <div id="">
                  <div>
                    <Text>
                      Click on the tabs below to engage in activities that support the 
                      <Text strong> Black Lives Matter </Text> movement! Estimated completion times are 
                      included on each relevant tab. Make sure to complete what you can and <Text strong>SHARE </Text> 
                      this with your friends!<br/>
                    </Text>

                    <Text copyable={{text: 'https://newunitedrepublic.org/'}} style={{fontSize:17.5}}>
                      Click icon to copy our link ->
                    </Text>
                    
                  </div>
                </div>
              </Panel>
              <Panel header={<span><Title level={4} keyboard><MailOutlined /> Quick Emails</Title><Text>~ 20 seconds</Text></span>} key="2" showArrow={false}>
                <div id="">
                  <div>
                    <Text>Click the buttons below to auto-generate emails to organizations and officials that can actually make change!</Text>
                    <br/><br/>
                    <Text>
                      1. Click each "Email" button below.
                      <br/>
                      2. Send the email.
                      <br/>
                      3. DONE!
                      <br/>
                    </Text>
                  </div>
                  
                  <div id="quickEmailSubsection">
                    <div>
                      <Text>
                        Campaign Zero recently introduced a list of eight policy actions that can reduce 
                        police violence by 72%. Click the button below to send an email demanding 8 specific 
                        policy actions to a growing list of police departments and prosecutors.
                      </Text>
                      <Text>
                        <a href='https://8cantwait.org/' target="_blank" rel="noopener noreferrer"> Learn More</a>.
                      </Text>
                    </div>

                    <div className="emailButtonDiv">
                      <a href="https://bit.ly/blmcampzeroemailb">
                        <Button type="primary" shape="round" icon={<MailOutlined />} size="medium">
                            Email
                        </Button>
                      </a>
                    </div>
                  </div>

                  <div id="quickEmailSubsection">
                    <div>
                      <Text>
                        On May 31, the NAACP issued a press release with five principles that must be included 
                        in federal policing legislation. Click the button below to send an email to a growing 
                        list of police departments and prosecutors demanding that those 5 principles be adapted 
                        into their policies.
                      </Text>
                      <Text>
                        <a href='https://naacp.org/latest/update-naacp-demands/' target="_blank" rel="noopener noreferrer"> Learn More</a>.
                      </Text>
                    </div>

                    <div className="emailButtonDiv">
                      <a href="https://bit.ly/blmnaacpemail">
                        <Button type="primary" shape="round" icon={<MailOutlined />} size="medium">
                            Email
                        </Button>
                      </a>
                    </div>
                  </div>
                                

                  <div>
                    <Text>
                      NOTE: SOME EMAIL ADDRESSES WILL REJECT YOUR EMAILS.
                      That's okay. Inboxes are being deleted to ignore our messages.
                      We will be updating email templates consistently.
                      If the emails bounce, don't worry. Thanks!
                      
                    </Text>
                  </div>
                </div>
              </Panel>
              <Panel header={<span><Title level={4} keyboard><DatabaseOutlined /> Email Address Bank</Title><Text>Coming Soon</Text></span>} key="3" showArrow={false} >
                <div>
                  <Text>
                    We need your help! This page is also home to a crowdsourced list of email addresses of relevant 
                    government officials and offices across the U.S.
                    <br/><br/>
                    Please add to our list of email addresses to contact so we can reach more representatives and 
                    officials! We will use this master list to send our "Quick Emails" found in the tab above. 
                    <br/><br/>
                    Look up and submit contact information for: <br/>
                  </Text>
                  <Text strong>
                    Legislators and their staff members<br/>
                    Governors, mayors, and their staff members<br/>
                    Police/sheriff departments<br/>
                    Prosecutors and district attorneys<br/>
                    Attorneys generals<br/>
                    and other law enforcement officials<br/> 
                  </Text>
                  <Text>
                    (All email addresses will be reviewed prior to being added to our master email list)<br/><br/>
                  </Text>
                </div>
                <div>
                  <Text strong>
                    Representative / Official Contact Info:
                  </Text>
                  <div>
                    <Input
                      style={{
                        width: 150,
                        textAlign:"center"
                      }}
                      type="text"
                      // value={phoneNumber} 
                      // onChange={this.onTextboxChangePhoneNumber}
                      size="medium" 
                      placeholder="City (optional)" 
                      disabled
                      />
                  </div>
                  <div className="inputType">
                      <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="State (optional)"
                        style={{
                          width: 150,
                          textAlign:"center",
                          alignContent:"center"
                        }}
                        // optionFilterProp="children"
                        // onChange={onChange}
                        // onFocus={onFocus}
                        // onBlur={onBlur}
                        // onSearch={onSearch}
                        options={options}
                        filterOption={(inputValue, option) =>
                          option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                        }
                        disabled
                      ></Select>
                  </div>
                  <div>
                    <Input
                      style={{
                        width: 150,
                        textAlign:"center"
                      }}
                      type="text"
                      // value={phoneNumber} 
                      // onChange={this.onTextboxChangePhoneNumber}
                      size="medium" 
                      placeholder="Email Address" 
                      disabled
                      />
                  </div>
                  <div className="emailButtonDiv">
                    {/* <a href=""> */}
                      <Button type="primary" shape="round" icon={<MailOutlined />} size="large" disabled>
                          Submit
                      </Button>
                    {/* </a> */}
                  </div>
                </div>
              </Panel>
              <Panel header={<span><Title level={4} keyboard><PhoneOutlined /> Call Policymakers</Title><Text>~ 1.5 minutes</Text></span>} key="4" showArrow={false}>
                <div id="">
                  <div>
                    <Text>
                      Calling policymakers is an effective way of making your voice heard.<br/>
                      We'll even give you a script to help:<br/><br/>
                      First, search here for phone number to call:<br/>
                    </Text>
                  </div>
                  
                  <div style={{padding:10}}>
                          <Input 
                            type="text"
                            value={zipcode} 
                            onChange={this.onTextboxChangeZipcode} 
                            addonBefore={<PushpinOutlined style={{ color: '#08c' }}/>}
                            suffix={<CheckCircleOutlined style={{ color: zipcodeStatus }}/>} 
                            size="large" 
                            placeholder="Your Zipcode" 
                            style={{width:185}}
                            />
                  </div>

                  <div style={{paddingBottom:5}}>
                    <Button type="primary" onClick={this.onClickToFindReps} size='medium' shape='round' loading={getInfoIsLoading}>Get Info</Button>
                  </div>

                  <div id="subscriptionStatusBox" style={{visibility:policymakerBoxVisible}}>
                    <Alert message={<pre>{repinfoMessage}</pre>} type={repinfoMessage ==='Invalid Zipcode' ? 'error' : 'success'} showIcon />
                  </div>

                  <div style={{padding:5}}>
                    <Text>
                      Second, copy the phone number provided and use this 
                    <a href={blmcallscriptpdf} target="_blank" > call script</a>.
                    </Text>
                  </div>
                </div>
            
              </Panel>
              <Panel header={<Title level={4} keyboard><CheckCircleOutlined /> Petitions</Title>} key="5" showArrow={false}>
                <div id="">
                  <div>
                    <Text>
                      Here’s a list of active petitions you could sign:<br/> 
                      <div className="petitionLinks">
                      <Text keyboard><a href="https://www.change.org/p/department-of-justice-mandatory-life-sentence-for-police-brutality" target="_blank" rel="noopener noreferrer">Mandatory Life Sentence for Police Brutality</a><br/></Text>
                      </div>
                      
                      <div className="petitionLinks">
                      <Text keyboard><a href="https://www.change.org/p/fbi-criminal-charges-for-travis-greg-mcmichael-in-the-murder-of-black-jogger-ahmaud-arbery" target="_blank" rel="noopener noreferrer">Criminal Charges for Travis and Greg McMichael in the murder of Black Jogger Ahmaud Arbery</a><br/></Text>
                      </div>
                      <div className="petitionLinks">
                        <Text keyboard><a href="https://www.change.org/p/federal-bureau-of-investigation-disbarment-of-george-e-barnhill" target="_blank" rel="noopener noreferrer">Disbarment Of George E. Barnhill</a><br/></Text>
                      </div>
                      
                      <div className="petitionLinks">
                        <Text keyboard><a href="https://www.change.org/p/us-senate-hands-up-act" target="_blank" rel="noopener noreferrer">Hands Up Act  </a><br/></Text>
                      </div>
                      
                      <div className="petitionLinks">
                        <Text keyboard><a href="https://www.change.org/p/department-of-justice-police-accountability-act-of-2020" target="_blank" rel="noopener noreferrer">Police Accountability Act 2020 </a><br/></Text>
                      </div>
                      <div className="petitionLinks">
                        <Text keyboard><a href="https://www.change.org/p/nypd-fire-racist-criminal-michael-j-reynolds-from-the-nypd" target="_blank" rel="noopener noreferrer">Fire NYPD Michael J Reynolds  </a><br/></Text>
                      </div>
                      
                      <div className="petitionLinks">
                        <Text keyboard><a href="https://act.eff.org/action/protect-our-speech-and-security-online-reject-the-graham-blumenthal-bill" target="_blank" rel="noopener noreferrer">Protect our Speech and Security Online: Reject the Graham- Blumenthal Bill  </a><br/></Text>
                      </div>




                      <div className="petitionLinks">
                        <Text keyboard><a href="https://bailfunds.github.io/" target="_blank" rel="noopener noreferrer">Bail Funds</a><br/></Text>
                      </div>
                      <div className="petitionLinks">
                        <Text keyboard><a href="https://www.change.org/p/julius-jones-is-innocent-don-t-let-him-be-executed-by-the-state-of-oklahoma" target="_blank" rel="noopener noreferrer">Julius Jones</a><br/></Text>
                      </div>
                      <div className="petitionLinks">
                      <Text keyboard><a href="https://www.change.org/p/govia-thameslink-justice-for-belly-mujinga-justiceforbellymujinga" target="_blank" rel="noopener noreferrer">Belly Mujinga</a><br/></Text>
                      </div>
                      <div className="petitionLinks">
                      <Text keyboard><a href="https://www.change.org/p/justice-for-regis-korchinski-paquet" target="_blank" rel="noopener noreferrer">Regis Korchinski Paquet</a><br/></Text>
                      </div>
                      <div className="petitionLinks">
                      <Text keyboard><a href="https://www.change.org/p/governor-brian-kemp-justice-for-ahmaud-arbery" target="_blank" rel="noopener noreferrer">Justice for Ahmaud Arbery (Pass Georgia Hate Crime bill)</a><br/></Text>
                      </div>
                      <div className="petitionLinks">
                        <Text keyboard><a href="https://www.change.org/p/justice-for-tony-mcdade" target="_blank" rel="noopener noreferrer">Tony McDade  </a><br/></Text>
                      </div>
                      <div className="petitionLinks">
                        <Text keyboard><a href="https://www.change.org/p/prefeitura-do-rio-de-janeiro-justice-for-joāo-pedro" target="_blank" rel="noopener noreferrer"> Joao Pedro </a><br/></Text>
                      </div>
                      <div className="petitionLinks">
                        <Text keyboard><a href="https://www.change.org/p/andy-beshear-justice-for-breonna-taylor" target="_blank" rel="noopener noreferrer">Breonna Taylor  </a><br/></Text>
                      </div>
                      <div className="petitionLinks">
                        <Text keyboard><a href="https://www.change.org/p/alabama-governor-kay-ivey-willie-simmons-has-served-38-years-for-a-9-robbery" target="_blank" rel="noopener noreferrer">Will Simmons </a><br/></Text>
                      </div>
                      <div className="petitionLinks">
                        <Text keyboard><a href="https://www.change.org/p/united-states-supreme-court-justice-for-kendrick-johnson" target="_blank" rel="noopener noreferrer"> Kendrick Johnson</a><br/></Text>
                      </div>
                      <div className="petitionLinks">
                        <Text keyboard><a href="https://www.change.org/p/reform-alliance-freejeffersonelie" target="_blank" rel="noopener noreferrer">Jefferson Elie </a><br/></Text>
                      </div>
                      <div className="petitionLinks">
                        <Text keyboard><a href="https://www.change.org/p/ron-desantis-free-anthony-wint-fbc27c7c-920d-4104-9960-a234f45cbe20" target="_blank" rel="noopener noreferrer">Anthony Wint </a><br/></Text>
                      </div>
                      <div className="petitionLinks">
                        <Text keyboard><a href="https://www.change.org/p/department-of-justice-investigate-the-killing-of-tamir-rice" target="_blank" rel="noopener noreferrer"> Tamir Rice</a><br/></Text>
                      </div>
                      <div className="petitionLinks">
                        <Text keyboard><a href="https://www.change.org/p/san-leandro-police-deartment-justice-for-emerald-black" target="_blank" rel="noopener noreferrer">Emerald Black </a><br/></Text>
                      </div>
                      <div className="petitionLinks">
                        <Text keyboard><a href="https://www.change.org/p/bre-jackson-justice-for-amiya-braxton" target="_blank" rel="noopener noreferrer"> Amiya Braxton</a><br/></Text>
                      </div>
                      <div className="petitionLinks">
                        <Text keyboard><a href="https://www.change.org/p/gregg-abbott-justice-for-jennifer-jeffley" target="_blank" rel="noopener noreferrer"> Jennifer Jeffley </a><br/></Text>
                      </div>
                      <div className="petitionLinks">
                        <Text keyboard><a href="https://www.change.org/p/st-joseph-county-prosecutor-ken-cotter-outside-investigation-im-the-officer-involved-shooting-of-eric-jack-logan" target="_blank" rel="noopener noreferrer"> Eric Jack Logan </a><br/></Text>
                      </div>
                      <div className="petitionLinks">
                        <Text keyboard><a href="https://www.change.org/p/florida-police-department-justice-for-alejandro-vargas-martinez" target="_blank" rel="noopener noreferrer"> Alejandro Vargas Martinez </a><br/></Text>
                      </div>
                      <div className="petitionLinks">
                        <Text keyboard><a href="https://www.change.org/p/texas-governor-i-want-sandra-bland-s-case-reopened" target="_blank" rel="noopener noreferrer">Sandra Bland  </a><br/></Text>
                      </div>
                      <div className="petitionLinks">
                        <Text keyboard><a href="https://www.change.org/p/pol%C3%ADcia-civil-de-pernambuco-ministério-público-justiça-por-miguel?recruiter=994403659&utm_source=share_petition&utm_medium=twitter&utm_campaign=psf_combo_share_initial&utm_term=psf_combo_share_initial&recruited_by_id=704ab810-c391-11e9-b0a0-c336d628a691" target="_blank" rel="noopener noreferrer">Miguel Otavio Santana Da Silva </a><br/></Text>
                      </div>
                      <div className="petitionLinks">
                        <Text keyboard><a href="https://www.change.org/p/baltimore-justice-for-alajunaye-davis?utm_source=share_petition&utm_medium=custom_url&recruited_by_id=f0720fb0-a203-11ea-9450-696a5bc82126" target="_blank" rel="noopener noreferrer">Alajunaye Davis  </a><br/></Text>
                      </div>
                      <div className="petitionLinks">
                        <Text keyboard><a href="https://www.change.org/p/white-house-justice-for-sean" target="_blank" rel="noopener noreferrer">Justice for Sean </a><br/></Text>
                      </div>
                      <div className="petitionLinks">
                        <Text keyboard><a href="https://www.change.org/p/illinois-governor-correcting-a-wrongful-conviction-kyjuanzi-harris" target="_blank" rel="noopener noreferrer">Kyjuanzi Harris </a><br/></Text>
                      </div>
                      <div className="petitionLinks">
                        <Text keyboard><a href="https://www.change.org/p/portland-police-bureau-justice-for-tete" target="_blank" rel="noopener noreferrer"> Tete Gulley</a><br/></Text>
                      </div>
                    </Text>
                  </div>
                </div>
              </Panel>
              <Panel header={<Title level={4} keyboard><ArrowsAltOutlined /> Bail Funds</Title>} key="6" showArrow={false}>
                <div id="">
                  <div>
                    <Text>
                      Here’s a list of bail funds across the United States that you can contribute to:<br/> 
                      <a href="https://bailfunds.github.io/" target="_blank" rel="noopener noreferrer">Bail Funds</a>
                    </Text>
                  </div>
                </div>
              </Panel>
              <Panel header={<Title level={4} keyboard><DollarOutlined /> Donate</Title>} key="7" showArrow={false}>
                <div id="">
                  <Collapse>
                      <Panel header="Organizations">
                        <div className="petitionLinks">
                          <Text keyboard><a href="https://www.blackvisionsmn.org/" target="_blank" rel="noopener noreferrer">Black Visions Collective </a><br/></Text>
                        </div>
                        <div className="petitionLinks">
                          <Text keyboard><a href="https://eji.org/" target="_blank" rel="noopener noreferrer">Equal Justice Initiative  </a><br/></Text>
                        </div>
                        <div className="petitionLinks">
                          <Text keyboard><a href="https://www.reclaimtheblock.org/home" target="_blank" rel="noopener noreferrer">Reclaim The Block </a><br/></Text>
                        </div>
                        <div className="petitionLinks">
                          <Text keyboard><a href="https://www.naacpldf.org/" target="_blank" rel="noopener noreferrer">NAACP Legal Defense Fund </a><br/></Text>
                        </div>
                        <div className="petitionLinks">
                          <Text keyboard><a href="https://undocublack.org/" target="_blank" rel="noopener noreferrer"> UndocuBlack</a><br/></Text>
                        </div>
                        <div className="petitionLinks">
                          <Text keyboard><a href="https://blacklivesmatter.com/" target="_blank" rel="noopener noreferrer">The Black Lives Matter Foundation </a><br/></Text>
                        </div>
                        <div className="petitionLinks">
                          <Text keyboard><a href="https://www.gofundme.com/f/georgefloyd" target="_blank" rel="noopener noreferrer">George Floyd Memorial Fund </a><br/></Text>
                        </div>
                        <div className="petitionLinks">
                          <Text keyboard><a href="https://www.byp100.org/" target="_blank" rel="noopener noreferrer">BYP100 </a><br/></Text>
                        </div>
                        <div className="petitionLinks">
                          <Text keyboard><a href="https://marshap.org/" target="_blank" rel="noopener noreferrer">Marsha P. Johnson Institute </a><br/></Text>
                        </div>
                        <div className="petitionLinks">
                          <Text keyboard><a href="https://www.theokraproject.com/" target="_blank" rel="noopener noreferrer">The Okra Project </a><br/></Text>
                        </div>
                      </Panel>
                      <Panel header="Organizations that match donations">
                        <div className="petitionLinks">
                          <Text keyboard><a href="https://docs.google.com/spreadsheets/d/1vbSyRDdEcDiAJWOEnMGnXL-ojbDPMQN8R4kEjxSQNnw/htmlview" target="_blank" rel="noopener noreferrer">Donation Matching Reference</a><br/></Text>
                        </div>
                      </Panel>
                  </Collapse>
                </div>
              </Panel>
              <Panel header={<Title level={4} keyboard><ReadOutlined /> Reading Materials</Title>} key="8" showArrow={false}>
                <div id="">
                  <Collapse>
                      <Panel header="Assorted political writings by intellectuals from marginalized communities">
                        <div className="petitionLinks">
                          <Text keyboard><a href="https://drive.google.com/drive/u/0/folders/1gbng08qtlLlKu9KSH5w4UnDWi4LMCH5k" target="_blank" rel="noopener noreferrer">Assorted Collection</a><br/></Text>
                        </div>
                      </Panel>
                      <Panel header="From the policing abolition/defunding perspective">
                        <div className="petitionLinks">
                          <Text keyboard><a href="https://www.google.com/amp/s/www.rollingstone.com/politics/politics-news/police-brutality-cop-free-world-protest-199465/amp/" target="_blank" rel="noopener noreferrer">Rolling Stone: 6 Ideas For A Cop Free World</a><br/></Text>
                        </div>
                        <div className="petitionLinks">
                          <Text keyboard><a href="https://www.mpd150.com/how-can-you-help-mpls-june-2020/" target="_blank" rel="noopener noreferrer">MPD150: How You Can Help</a><br/></Text>
                        </div>
                        <div className="petitionLinks">
                          <Text keyboard><a href="https://www.motherjones.com/crime-justice/2020/06/police-abolition-george-floyd/" target="_blank" rel="noopener noreferrer">Mother Jones: Police Abolition 101</a><br/></Text>
                        </div>
                        <div className="petitionLinks">
                          <Text keyboard><a href="https://theintercept.com/2019/01/31/arrests-policing-vera-institute-of-justice/" target="_blank" rel="noopener noreferrer">The Intercept: Police Make 10 Million Arrests a Year...</a><br/></Text>
                        </div>
                      </Panel>
                      <Panel header="From Campaign Zero">
                        <div className="petitionLinks">
                          <Text keyboard><a href="https://static1.squarespace.com/static/56996151cbced68b170389f4/t/57e1b5cc2994ca4ac1d97700/1474409936835/Police+Use+of+Force+Report.pdf" target="_blank" rel="noopener noreferrer">Police Use of Force Report</a><br/></Text>
                        </div>
                      </Panel>
                      <Panel header="From the NAACP">
                        <div className="petitionLinks">
                          <Text keyboard><a href="https://naacp.org/latest/update-naacp-demands/" target="_blank" rel="noopener noreferrer">Demands For Federal Legislation </a><br/></Text>
                        </div>
                        <div className="petitionLinks">
                          <Text keyboard><a href="http://www.naacp.org/issues/criminal-justice/" target="_blank" rel="noopener noreferrer">Criminal Justice Advocacy Updates </a><br/></Text>
                        </div>
                      </Panel>
                  </Collapse>
                </div>
              </Panel>             
              <Panel header={<Title level={4} keyboard><QuestionCircleOutlined /> Contact Us</Title>} key="9" showArrow={false}>
                <div id="">
                  <div>
                    <Text>
                      Do you have additional resources you'd like us to add? Please contact us at:<br/>
                    </Text>
                    <Text copyable={{text: 'blmquickemails@gmail.com'}}>blmquickemails@gmail.com</Text>
                  </div>
                </div>
                {/* <div className="creditsSection">
                  <div>
                    <span id="creditButton" onClick={this.creditClicked}>
                      <Text code>Credits</Text>
                    </span>
                  </div>
                  <div id="creditMessage">
                    <Text>
                      This resource was created with the help of:<br/>

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

                      S.K. Shankar &nbsp;<a href="https://www.linkedin.com/in/s-k-shankar-ba773113a/" target="_blank" rel="noopener noreferrer">
                      <LinkedinFilled className="bottomIcons"/>
                      </a>&nbsp;&nbsp;
                      <a href="https://www.instagram.com/kasergode/" target="_blank" rel="noopener noreferrer">
                      <InstagramOutlined className="bottomIcons"/>
                      </a><br/>
                      View the GitHub repository <a href="https://github.com/farouk877/blmemailresource" target="_blank" rel="noopener noreferrer">here</a> 

                    </Text>
                  </div>
                </div> */}

              </Panel>
            </Collapse>
          </div>
{/* 
          <div id="introSection">
            <div>
              <Title level={4} keyboard>Directions</Title>
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
              <br/>
            </div>
          </div>

          <div id="emailingSection">
            <div>
              <Title level={4} keyboard>Quick Emails</Title>
            </div>

            <div>
              <Text>
                Campaign Zero recently introduced a list of eight policy actions that can reduce 
                police violence by 72%. Click the button below to send an email demanding 8 specific 
                policy actions to a growing list of police departments and prosecutors.
              </Text>
              <Text>
                <a href='https://8cantwait.org/'> Learn More</a>
              </Text>
            </div>

            <div className="emailButtonDiv">
              <a href="https://bit.ly/blmemail">
                <Button type="primary" shape="round" icon={<MailOutlined />} size="medium">
                    Email
                </Button>
              </a>
            </div>
            
            <div>
              <Text>
                On May 31, the NAACP issued a press release with five principles that must be included 
                in federal policing legislation. Click the button below to send an email to a growing 
                list of police departments and prosecutors demanding that those 5 principles be adapted 
                into their policies.
              </Text>
              <Text>
                <a href=' https://naacp.org/latest/update-naacp-demands/'> Learn More</a>
              </Text>
            </div>

            <div className="emailButtonDiv">
              <a href="https://bit.ly/blmemail">
                <Button type="primary" shape="round" icon={<MailOutlined />} size="medium">
                    Email
                </Button>
              </a>
            </div>
            
          </div>

          <div id="callingPolicyMakers">
            <div>
              <Title level={4} keyboard>Call Policymakers</Title>
            </div>

            <div>
              <Text>
              Calling policymakers is also an effective way of making your 
              voice heard -- We even have a script [link] to get you started. Search here for phone number to call:
                <a href="https://8cantwait.org/">8 Can’t Wait</a>
              </Text>
            </div>
            
            <div className="InputField">
                    <Input 
                      type="text"
                      value={zipcode} 
                      onChange={this.onTextboxChangeZipcode} 
                      addonBefore={<PushpinOutlined style={{ color: '#08c' }}/>}
                      suffix={<CheckCircleOutlined style={{ color: zipcodeStatus }}/>} 
                      size="large" 
                      placeholder="Zipcode" 
                      />
            </div>

            <div className="subscribeButton">
              <Button type="primary" onClick={this.onClickToFindReps} size='large' shape='round' loading={getInfoIsLoading}>Get Info</Button>
            </div>

            <div id="subscriptionStatusBox" style={{visibility:policymakerBoxVisible}}>
              <Alert message={repinfoMessage} type={repinfoMessage ==='Invalid Zipcode' ? 'error' : 'success'} showIcon />
            </div>
          </div>
            
          <div id="bailFundsSection">
            <div>
              <Title level={4} keyboard>Bail Funds</Title>
            </div>

            <div>
              <Text>
                Here’s a list of bail funds across the country that you can contribute to. 
                <a href="https://bailfunds.github.io/">Bail Funds Resource</a>
              </Text>
            </div>
          </div>

          <div id="contactusSection">
            <div>
              <Title level={4} keyboard>Contact Us</Title>
            </div>

            <div>
              <Text>
                Do you have additional resources that you would like to add? Please contact us at:<br/>
              </Text>
              <Text copyable={{text: 'blmquickemails@gmail.com'}}>blmquickemails@gmail.com</Text>
            </div>
          </div> */}

{/* 
          <div>
            <Title level={3}>Resource Bank</Title>
          </div>

          <div>
            <Text>
              We need your help! This page is also home to a crowdsourced repository of email addresses and phone numbers for 
              police departments and government officials across the U.S. It also stores information for bail funds.<br/> 
              Please add to our list of email addresses and phone numbers! Look up and submit contact information for police 
              departments and policymakers in order for us to reach a wider audience. 
            </Text>
          </div>

          <div>
            <Text>
              Here’s a list of all the local law enforcement agencies in the country to get you started. 
            </Text>
            <a href="https://en.wikipedia.org/wiki/List_of_United_States_state_and_local_law_enforcement_agencies" target="_blank" rel="noopener noreferrer">
              <Button type="primary" shape="round" icon={<MailOutlined />} size="medium">
                  Law Enforcement Agencies
              </Button>
            </a>
          </div>

          <div>
            <Text>
              Here’s a list of sitting U.S. House of Representatives members. 
            </Text>
            <a href="https://en.wikipedia.org/wiki/List_of_current_members_of_the_United_States_House_of_Representatives" target="_blank" rel="noopener noreferrer">
              <Button type="primary" shape="round" icon={<MailOutlined />} size="medium">
                  Law Enforcement Agencies
              </Button>
            </a>
          </div>

          <div>
            <Text>
              Here’s a list of sitting U.S. Senate members. 
            </Text>
            <a href="https://en.wikipedia.org/wiki/List_of_current_United_States_senators" target="_blank" rel="noopener noreferrer">
              <Button type="primary" shape="round" icon={<MailOutlined />} size="medium">
                  Law Enforcement Agencies
              </Button>
            </a>
          </div>
  
          <div>
            <div>
              <Input
                style={{
                  width: 150,
                  textAlign:"center"
                }}
                type="text"
                // value={phoneNumber} 
                // onChange={this.onTextboxChangePhoneNumber}
                size="medium" 
                placeholder="City" 
                />
            </div>
            <div className="inputType">
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="State"
                  style={{
                    width: 150,
                    textAlign:"center",
                    alignContent:"center"
                  }}
                  // optionFilterProp="children"
                  // onChange={onChange}
                  // onFocus={onFocus}
                  // onBlur={onBlur}
                  // onSearch={onSearch}
                  options={options}
                  filterOption={(inputValue, option) =>
                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                  }
                ></Select>
            </div>
            <div>
              <Input
                style={{
                  width: 150,
                  textAlign:"center"
                }}
                type="text"
                // value={phoneNumber} 
                // onChange={this.onTextboxChangePhoneNumber}
                size="medium" 
                placeholder="Email Address" 
                />
            </div>
            <div>
              <Input
                style={{
                  width: 150,
                  textAlign:"center"
                }}
                type="text"
                // value={phoneNumber} 
                // onChange={this.onTextboxChangePhoneNumber}
                size="medium" 
                placeholder="Phone Number" 
                />
            </div>
            <div className="emailButtonDiv">
              <a href="https://bit.ly/blmemail">
                <Button type="primary" shape="round" icon={<MailOutlined />} size="large">
                    Submit
                </Button>
              </a>
            </div>
          </div>





          <div>
            <Title level={3}>Bail Funds</Title>
          </div>

          <div>
            <Text>
              We are also working on a repository of bail funds across the nation! You can search for one by state and city here: 
            </Text>
          </div>
  
          <div>
            <div>
              <Input
                style={{
                  width: 150,
                  textAlign:"center"
                }}
                type="text"
                // value={phoneNumber} 
                // onChange={this.onTextboxChangePhoneNumber}
                size="medium" 
                placeholder="City" 
                />
            </div>
            <div className="inputType">
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="State"
                  style={{
                    width: 150,
                    textAlign:"center",
                    alignContent:"center"
                  }}
                  // optionFilterProp="children"
                  // onChange={onChange}
                  // onFocus={onFocus}
                  // onBlur={onBlur}
                  // onSearch={onSearch}
                  options={options}
                  filterOption={(inputValue, option) =>
                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                  }
                ></Select>
            </div>
            <div className="emailButtonDiv">
              <a href="https://bit.ly/blmemail">
                <Button type="primary" shape="round" icon={<MailOutlined />} size="large">
                    Submit
                </Button>
              </a>
            </div>
            <div>
              <Text>
                We are also working on a repository of bail funds across the nation! You can search for one by state and city here: 
              </Text>
            </div>
            <div>
              <Input
                style={{
                  width: 150,
                  textAlign:"center"
                }}
                type="text"
                // value={phoneNumber} 
                // onChange={this.onTextboxChangePhoneNumber}
                size="medium" 
                placeholder="City" 
                />
            </div>
            <div className="inputType">
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="State"
                  style={{
                    width: 150,
                    textAlign:"center",
                    alignContent:"center"
                  }}
                  // optionFilterProp="children"
                  // onChange={onChange}
                  // onFocus={onFocus}
                  // onBlur={onBlur}
                  // onSearch={onSearch}
                  options={options}
                  filterOption={(inputValue, option) =>
                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                  }
                ></Select>
            </div>
            <div className="emailButtonDiv">
              <a href="https://bit.ly/blmemail">
                <Button type="primary" shape="round" icon={<MailOutlined />} size="large">
                    Submit
                </Button>
              </a>
            </div>

            <div className="contact">
              <Text>
                If you have relevent emails or templates you think we should add, please email:
              </Text><br/>
              <Text copyable={{text: 'blmquickemails@gmail.com'}}>blmquickemails@gmail.com</Text>
            </div> */}
          












{/* 
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

                S.K. Shankar &nbsp;<a href="https://www.linkedin.com/in/s-k-shankar-ba773113a/" target="_blank" rel="noopener noreferrer">
                <LinkedinFilled className="bottomIcons"/>
                </a>&nbsp;&nbsp;
                <a href="https://www.instagram.com/kasergode/" target="_blank" rel="noopener noreferrer">
                <InstagramOutlined className="bottomIcons"/>
                </a><br/> 

              </Text>
            </div>
          </div> */}
            
            
            
  
  
           
  
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


{/* <div>
            <div>
              <Input
                style={{
                  width: 150,
                  textAlign:"center"
                }}
                type="text"
                // value={phoneNumber} 
                // onChange={this.onTextboxChangePhoneNumber}
                size="medium" 
                placeholder="City" 
                
                />
            </div>
            <div className="inputType">
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="State"
                  style={{
                    width: 150,
                    textAlign:"center",
                    alignContent:"center"
                    
                  }}
                  // optionFilterProp="children"
                  // onChange={onChange}
                  // onFocus={onFocus}
                  // onBlur={onBlur}
                  // onSearch={onSearch}
                  options={options}
                  filterOption={(inputValue, option) =>
                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                  }
                ></Select>
            </div>
            <div className="emailButtonDiv">
              <a href="https://bit.ly/blmemail">
                <Button type="primary" shape="round" icon={<MailOutlined />} size="large">
                    Submit
                </Button>
              </a>
            </div>
          </div> */}