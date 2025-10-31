import React, { Component } from "react";
import { Fade, Slide } from "react-reveal";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contactName: "",
      contactEmail: "",
      contactSubject: "",
      contactMessage: "",
      isLoading: false,
      isSent: false,
      error: null,
      successMessage: null
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
      error: null,
      successMessage: null
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { contactName, contactEmail, contactMessage } = this.state;

    // Basic validation
    if (!contactName || !contactEmail || !contactMessage) {
      this.setState({ error: "Please fill in all required fields." });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactEmail)) {
      this.setState({ error: "Please provide a valid email address." });
      return;
    }

    this.setState({ 
      isLoading: true, 
      error: null, 
      successMessage: null 
    });

    const apiUrl = process.env.NODE_ENV === 'production'
      ? process.env.REACT_APP_API_URL + '/api/contact'  
      : 'http://localhost:80/api/contact';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          message: contactMessage
        })
      });

      const data = await response.json();

      if (response.ok) {
        this.setState({
          successMessage: "Your message was sent successfully!",
          isSent: true
        });
        
        // Reset form and isSent state after 3 seconds
        setTimeout(() => {
          this.setState({
            isSent: false,
            contactName: "",
            contactEmail: "",
            contactSubject: "",
            contactMessage: ""
          });
        }, 3000);
      } else {
        this.setState({ error: data.error || "Failed to send message" });
      }
    } catch (error) {
      console.error('Submission error:', error);
      this.setState({ error: "Failed to connect to the server. Please try again later." });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  render() {
    if (!this.props.data) return null;

    const { isLoading, isSent, error, successMessage } = this.state;
    const name = this.props.data.name;
    const street = this.props.data.address.street;
    const city = this.props.data.address.city;
    const state = this.props.data.address.state;
    const zip = this.props.data.address.zip;
    const phone = this.props.data.phone;
    const email = this.props.data.email;
    const message = this.props.data.contactmessage;

    return (
      <section id="contact">
        <Fade bottom duration={1000}>
          <div className="row section-head">
            <div className="two columns header-col">
              <h1>
                <span>Get In Touch.</span>
              </h1>
            </div>
            <div className="ten columns">
              <p className="lead">{message}</p>
            </div>
          </div>
        </Fade>

        <div className="row">
          <Slide left duration={1000}>
            <div className="eight columns">
              <form onSubmit={this.handleSubmit} id="contactForm" name="contactForm">
                <fieldset>
                  <div>
                    <label htmlFor="contactName">
                      Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      value={this.state.contactName}
                      size="35"
                      id="contactName"
                      name="contactName"
                      onChange={this.handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="contactEmail">
                      Email <span className="required">*</span>
                    </label>
                    <input
                      type="email"
                      value={this.state.contactEmail}
                      size="35"
                      id="contactEmail"
                      name="contactEmail"
                      onChange={this.handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="contactSubject">Subject</label>
                    <input
                      type="text"
                      value={this.state.contactSubject}
                      size="35"
                      id="contactSubject"
                      name="contactSubject"
                      onChange={this.handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="contactMessage">
                      Message <span className="required">*</span>
                    </label>
                    <textarea
                      value={this.state.contactMessage}
                      cols="50"
                      rows="15"
                      id="contactMessage"
                      name="contactMessage"
                      onChange={this.handleChange}
                    ></textarea>
                  </div>

                  <div>
                    <button 
                      className="submit"
                      type="submit"
                      disabled={isLoading || isSent}
                    >
                      {isLoading ? "Sending..." : isSent ? "Sent!" : "Submit"}
                    </button>
                    {isLoading && (
                      <span id="image-loader">
                        <img alt="" src="images/loader.gif" />
                      </span>
                    )}
                  </div>
                </fieldset>
              </form>

              {error && (
                <div id="message-warning">
                  {error}
                </div>
              )}
              
              {successMessage && (
                <div id="message-success">
                  <i className="fa fa-check"></i>{successMessage}
                  <br />
                </div>
              )}
            </div>
          </Slide>

          <Slide right duration={1000}>
            <aside className="four columns footer-widgets">
              <div className="widget widget_contact">
                <h4>Contact Details</h4>
                <p className="address">
                  {/* {name} */}
                  {/* <br />
                  {phone} */}
                  {/* <br /> */}
                  {email}
                </p>
              </div>
            </aside>
          </Slide>
        </div>
      </section>
    );
  }
}

export default Contact;
