import React, { Component } from "react";
import ReactGA from "react-ga";
import $ from "jquery";
import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import About from "./Components/About";
import Resume from "./Components/Resume";
import Contact from "./Components/Contact";
import Portfolio from "./Components/Portfolio";
import ChatbotComponent from "./Components/Chatbot/Chatbot";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foo: "bar",
      resumeData: {},
      isChatMinimized: true
    };

    ReactGA.initialize("UA-110570651-1");
    ReactGA.pageview(window.location.pathname);
  }

  getResumeData() {
    $.ajax({
      url: "./resumeData.json",
      dataType: "json",
      cache: false,
      success: function(data) {
        this.setState({ resumeData: data });
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(err);
        alert(err);
      }
    });
  }

  componentDidMount() {
    this.getResumeData();
    console.log(process.env.REACT_APP_API_URL);
    console.log(process.env.NODE_ENV);
  }

  toggleChat = () => {
    this.setState(prevState => ({
      isChatMinimized: !prevState.isChatMinimized
    }));
  };

  render() {
    return (
      <div className="App">
        <Header 
          data={this.state.resumeData.main} 
          setChatMinimized={this.toggleChat}
        />
        <About data={this.state.resumeData.main} />
        <Resume data={this.state.resumeData.resume} />
        <Portfolio data={this.state.resumeData.portfolio} />
        <Contact data={this.state.resumeData.main} />
        <Footer data={this.state.resumeData.main} />
        <ChatbotComponent 
          isMinimized={this.state.isChatMinimized}
          setChatMinimized={this.toggleChat}
        />
      </div>
    );
  }
}

export default App;
