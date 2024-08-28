
// Example usage:
// const message = "Here are some key points about Iran based on the provided context:\n\n**Military Capabilities**:\n  Iran has demonstrated significant military capabilities, including precision missile strikes that can target specific locations without causing significant casualties or ";
// const chatbotData = { ThemeColor: '#007bff' };



function copyMessageToClipboard(message) {
  navigator.clipboard.writeText(message).then(function () {
    alert('Copying to clipboard was successful!');
  }, function (err) {
    alert('Could not copy text: ' + err);
  });
}

/*function generateShareUrl(message) {
  const encodedMessage = encodeURIComponent(message);
  const shareUrl = `https://yourdomain.com/chat?message=${encodedMessage}`;
  navigator.clipboard.writeText(shareUrl).then(function () {
    alert('Share URL copied to clipboard!');
  }, function (err) {
    alert('Could not copy URL: ' + err);
  });
}

function generateTwitterPost(message) {
  const encodedMessage = encodeURIComponent(message);
  const shareUrl = `https://twitter.com/intent/tweet?text=${encodedMessage}`;
  window.open(shareUrl, '_blank', 'width=600,height=400');
}*/

// Function to extract links from JSON data
function extractLinks(data) {
  let links = [];

  for (let item of data) {
    if (item["Source Link"]) {
      links.push(item["Source Link"]);
    }
    if (item["Word Press Popup Link"]) {
      links.push(item["Word Press Popup Link"]);
    }
  }
  return links;
}

async function fetchChatbotAppearance(chatbotID) {
  const apiUrl = `https://backend.botsfornonporfits.com/GetChatBotApprancebyChatbotID/${chatbotID}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    const data = await response.json();
    if (data.status === 'ok') {
      const chatbotData = data.data;
      return chatbotData;
    } else {
      throw new Error(`Error fetching chatbot appearance: ${data.message}`);
    }
  } catch (error) {
    console.error('Error fetching chatbot appearance:', error);
    throw error;
  }
}

function generateRandomID() {
  return (Math.floor(Math.random() * 90000) + 10000).toString(); // Generates a random 5-digit integer
}


async function setupChatbot(chatbotID) {

  const chatbotData = await fetchChatbotAppearance(chatbotID);
  const visitorID = generateRandomID();

  const style = `
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Poppins', sans-serif;
        }
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Poppins', sans-serif;
    }
    .kbucket-share-buttons {
        display: flex;
        gap: 10px;
        justify-content: flex-start;
        flex-direction: row!important;
        margin-top: 5px;
    }
    
    .kbucket-share-buttons button {
        background: none;
        border: none;
        cursor: pointer;
        padding: 5px;
       
    }
    
    .kbucket-share-buttons button svg {
        width: 12px;
        height: 12px;
        fill: currentColor;
    }

    .kbucket-chatbot-toggler {
      position: fixed;
      bottom: 30px;
      right: 35px;
      outline: none;
      border: none;
      height: 50px;
      width: 50px;
      display: flex;
      cursor: pointer;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background: ${chatbotData.ThemeColor};
      transition: all 0.2s ease;
      z-index: 999;
    }
    body.show-kbucket-chatbot .kbucket-chatbot-toggler {
      transform: rotate(90deg);
    }
    .kbucket-chatbot-toggler span {
      color: #fff;
      position: absolute;
    }
    .kbucket-chatbot-toggler span:last-child,
    body.show-kbucket-chatbot .kbucket-chatbot-toggler span:first-child {
      opacity: 0;
    }
    body.show-kbucket-chatbot .kbucket-chatbot-toggler span:last-child {
      opacity: 1;
    }
    .kbucket-chatbot {
      position: fixed;
      right: 35px;
      bottom: 90px;
      width: 420px;
      background: #fff;
      border-radius: 15px;
      overflow: hidden;
      opacity: 0;
      pointer-events: none;
      transform: scale(0.5);
      transform-origin: bottom right;
      box-shadow: ${chatbotData.ThemeColor} 0px 2px 5px -1px, ${chatbotData.ThemeColor} 0px 1px 3px -1px;
      
      border: 1px solid ${chatbotData.ThemeColor};
      transition: all 0.1s ease;
      z-index: 1111;
    }
    body.show-kbucket-chatbot .kbucket-chatbot {
      opacity: 1;
      pointer-events: auto;
      transform: scale(1);
    }
    .kbucket-chatbot header {
      padding: 16px 0;
      position: relative;
      text-align: center;
      color: #fff;
      background:${chatbotData.ThemeColor};
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    .kbucket-chatbot header span {
      position: absolute;
      right: 15px;
      top: 50%;
      display: none;
      cursor: pointer;
      transform: translateY(-50%);
    }
    // .kbucket-chatbot header h2 {
    //   font-size: 20px;
    //   margin: 10px 0;
    //   color: black;
    // }

    .kbucket-chatbot .kbucket-chatbox {
      overflow-y: auto;
      height: 500px;
      padding: 30px 20px 100px;
      font-size: 16px;
    }
    .kbucket-chatbot :where(.kbucket-chatbox, textarea)::-webkit-scrollbar {
      width: 6px;
      font-size: 16px;
    }
    .kbucket-chatbot :where(.kbucket-chatbox, textarea)::-webkit-scrollbar-track {
      background: #fff;
      border-radius: 25px;
      font-size: 16px;
    }
    .kbucket-chatbot :where(.kbucket-chatbox, textarea)::-webkit-scrollbar-thumb {
      background: #ccc;
      border-radius: 25px;
      font-size: 16px;
    }
    .kbucket-chatbox .kbucket-chat {
      display: flex;
      list-style: none;
      font-size: 16px;
    }
    .kbucket-chatbox .kbucket-outgoing {
      margin: 20px 0;
      justify-content: flex-end;
      color:white;
      font-size: 16px;
    }
    .kbucket-chatbox .kbucket-incoming div {
    color: black;
    background: #F2F2F2;
    font-size: 12px;
}
    .kbucket-chatbox .kbucket-chat > div {
      position: relative;
      padding: 12px 16px;
      border-radius: 10px 10px 0 10px;
      max-width: 95%;
      font-size: 16px;
      background: ${chatbotData.ThemeColor};
      color: #000;
    }
    .kbucket-chatbox .kbucket-chat p {
      white-space: pre-wrap;
      font-size: 16px;
      width: 100%;
      margin: 0;
    }
    .kbucket-chatbox .kbucket-incoming p {
      border-radius: 10px 10px 10px 0;
      font-size: 16px;
    }
    .kbucket-chatbox .kbucket-chat div :is(p.error) {
      color: #721C24;
      background: #F8D7DA;
      font-size: 16px;
    }
    
    .kbucket-chatbox .kbucket-chat > div > div a {
      border-radius: 100px;
      color: #fff;
      text-decoration: none;
      font-size: 16px;
      background:${chatbotData.ThemeColor};
      padding: 7px 20px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      width: fit-content;
      max-width: 100%;
      color: #000;
    }
    .kbucket-chatbox .kbucket-chat div a:hover {
      background-color:#363636 ;
      color:white;
      font-size: 16px;
    }
    .kbucket-chatbox .kbucket-incoming div {
      color: #white;
      background: #F2F2F2;
      font-size: 16px;
    }
    
.kbucket-chatbot .kbucket-chat-input {
    display: flex;
      gap: 5px;
      position: absolute;
      bottom: 0;
      width: 100%;
      background: #fff;
      padding: 5px 10px;
      border-top: 1px solid #ddd;
      
    }



    .kbucket-chat-input textarea {
      width: 100%;
      border: none;
      background-color: transparent;
      outline: none;
      resize: none;
      font-size: 14px;
      color: #666;
    }

    .kbucket-chat-input textarea::placeholder {
      color: #211f1f;
    }

    .kbucket-chat-input span {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 10px;
      font-size: 24px;
      color: #724AE8;
    }

    .kbucket-chat-input span:hover {
      color: #000;
    }
 .lead-form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 2px solid #F2F2F2;
    margin: 0 auto;
    background-color: white;
    border-radius: 20px;
    display: block;
    padding: 12%;
    text-align: center;
    width: 80%;
    color: black;
    z-index:111;
}

.lead-form input {
    width: 100%;
    text-align: left;
    border:1px solid #F2F2F2;
    margin:5px;
}

.lead-form button {
    width: 100%;
    background-color:${chatbotData.ThemeColor};
    border-radius: 10px;
    text-align: center;
    margin:5px;
    color:white;
    padding:5px;
}
// p,span
// {
    
//     font-size:12px;
// }
    @media (max-width: 490px) {
      .kbucket-chatbot-toggler {
        right: 20px;
        bottom: 20px;
      }
      .kbucket-chatbot {
        right: 0;
        bottom: 0;
        height: 100%;
        border-radius: 0;
        width: 100%;
      }
      .kbucket-chatbot .kbucket-chatbox {
        height: 90%;
        padding: 25px 15px 100px;
        font-size: 16px;
      }
      .kbucket-chatbot .kbucket-chat-input {
        padding: 5px 15px;
      }
      .kbucket-chatbot header span {
        display: block;
      }
    }
    `;

  const metaViewport = '<meta name="viewport" content="width=device-width, initial-scale=1.0" />';
  const fontImport1 = '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />';
  const fontImport2 = '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,400,1,0" />';

  const buttonHTML = `
        <button class="kbucket-chatbot-toggler">
            <span class="material-symbols-rounded">Chat</span>
            <span class="material-symbols-outlined">close</span>
        </button>
    `;
  const chatbotHTML = `
        <div class="kbucket-chatbot">
           
            <header style="display: flex; justify-content: space-between; align-items: center; background-color: white; padding: 10px; border-radius: 10px 10px 0 0;">
                <h2 style=" margin: 10px 0; font-size: 20px; color:black; font-weight: 400">${chatbotData.DisplayName}</h2>
                <a href="#" style="color: green; text-decoration: underline; text-decoration-color: green; font-size: 14px; margin-right: 10px;">Chat Logs</a>

                <span class="kbucket-close-btn material-symbols-outlined">close</span>
                
            </header>
            <ul class="kbucket-chatbox">
                <li class="kbucket-chat kbucket-incoming">
                  
                    <div>
                    <p>${chatbotData.InitialMessage}</p>
                    </div>
                </li>
            </ul>
            <div class="kbucket-chat-input">
                <textarea placeholder="Message..." spellcheck="false" required autofocus></textarea>
                <span id="kbucket-send-btn" style="color: ${chatbotData.ThemeColor}" class="material-symbols-rounded">send</span>
            </div>
        </div>
    `;

  // Combine all HTML content
  const htmlContent = `
        ${buttonHTML}
        ${chatbotHTML}
    `;

  // Create container div
  const containerDiv = document.createElement('div');
  containerDiv.innerHTML = htmlContent;

  // Append styles and HTML content to document
  const styleElement = document.createElement('style');
  styleElement.textContent = style;
  document.head.appendChild(styleElement);
  document.head.insertAdjacentHTML('beforeend', metaViewport);
  document.head.insertAdjacentHTML('beforeend', fontImport1);
  document.head.insertAdjacentHTML('beforeend', fontImport2);
  document.body.appendChild(containerDiv);

  // Functionality
  const chatbotToggler = containerDiv.querySelector('.kbucket-chatbot-toggler');
  const closeBtn = containerDiv.querySelector('.kbucket-close-btn');
  const chatbox = containerDiv.querySelector('.kbucket-chatbox');
  const chatInput = containerDiv.querySelector('.kbucket-chat-input textarea');
  const sendChatBtn = containerDiv.querySelector('#kbucket-send-btn');
  let userMessage = null; // Variable to store user's message
  let isRequestPending = false;
  const inputInitHeight = chatInput.scrollHeight;
  let chatHistory = [];

  // const createChatLi = (message, className) => {
  //     const chatLi = document.createElement('li');
  //     chatLi.classList.add('kbucket-chat', `kbucket-${className}`);
  //     let chatContent = className === 'outgoing' ? `<div><p></p></div>` : `<span class="material-symbols-outlined">smart_toy</span><div><p></p></div>`;
  //     chatLi.innerHTML = chatContent;
  //     chatLi.querySelector('p').textContent = message;
  //     return chatLi;
  // };

  const createChatLi = (message, className) => {
    const chatLi = document.createElement('li');
    chatLi.classList.add('kbucket-chat', `kbucket-${className}`);
    let chatContent = className === 'outgoing' ? `<div style="color:white"><p></p></div>` : `<span class="material-symbols-outlined"></span><div><p></p></div>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector('p').textContent = message;
    if (className === 'incoming') {
      const buttonsDiv = document.createElement('div');
      buttonsDiv.classList.add('kbucket-share-buttons');

      const copyButton = document.createElement('button');
      copyButton.dataset.action = 'copy';
      copyButton.dataset.message = message;
      copyButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M16 1H4c-1.1 0-1.99.9-1.99 2L2 17h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>'; // Material "content_copy" icon

      /* const twitterShareButton = document.createElement('button');
       twitterShareButton.dataset.action = 'twitter-share';
       twitterShareButton.dataset.message = message;
       twitterShareButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
       <path fill="currentColor" d="M23 5c-1.04.464-1.58 1.015-2 1.761.964-.375 1.564-1.157 1.884-2.002-.975.472-2.048.815-3.181 1.002C18.14 4.17 17.027 4 15.865 4c-2.762 0-5 2.238-5 5 0 .393.047.77.128 1.133-4.154-.212-7.843-2.19-10.294-5.198-.429.696-.676 1.504-.676 2.365 0 1.63.831 3.067 2.094 3.905-.77-.024-1.497-.237-2.13-.588v.059c0 2.28 1.625 4.182 3.771 4.614-.395.105-.809.161-1.23.161-.299 0-.59-.029-.876-.082.59 1.869 2.312 3.224 4.348 3.258-1.592 1.25-3.596 1.992-5.772 1.992-.375 0-.746-.021-1.115-.065 2.055 1.312 4.49 2.081 7.117 2.081 8.547 0 13.206-7.073 13.206-13.205 0-.201-.004-.402-.012-.603.905-.653 1.693-1.469 2.315-2.397z"/>
     </svg>`;*/


      buttonsDiv.appendChild(copyButton);
      //buttonsDiv.appendChild(twitterShareButton);

      chatLi.querySelector('div').appendChild(buttonsDiv);
    }

    return chatLi;
  };

  // Now add the event listener for the chatbox to handle button clicks using event delegation

  chatbox.addEventListener('click', function (event) {

    if (event.target.closest('button[data-action="copy"]')) {
      const message = event.target.closest('button').dataset.message;
      copyMessageToClipboard(message);
    } else if (event.target.closest('button[data-action="twitter-share"]')) {
      const message = event.target.closest('button').dataset.message;
      generateTwitterPost(message);
    }
  });


  const integrateResources = (answer, sources) => {
    return answer.replace(/\[(\d+)\]/g, (match, number) => {
      return '';
    });
  };

  const generateResponse = chatElement => {
    const API_URL = 'https://backend.botsfornonporfits.com/Chat';
    const messageElement = chatElement.querySelector('p');
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chatbotId: chatbotID,
        question: userMessage,
        chat_history: chatHistory,
        visitorID: visitorID,

      })
    };
    fetch(API_URL, requestOptions)
      .then(res => res.json())
      .then(data => {
        chatHistory.push({
          human: userMessage,
          ai: data.answer
        });

        // const modifiedAnswer = integrateResources(extractDocId, data.reference_context);
        // const modifiedAnswer = data.answer
        messageElement.innerHTML = data.answer // highlightDocID(modifiedAnswer, chatbotData);

        // Update the data-message attribute for the copy and share and twiter share buttons
        const buttonsDiv = chatElement.querySelector('.kbucket-share-buttons');
        if (buttonsDiv) {
          const copyButton = buttonsDiv.querySelector('button[data-action="copy"]');
          const twitterShareButton = buttonsDiv.querySelector('button[data-action="twitter-share"]');

          if (copyButton) {
            copyButton.dataset.message = (data.answer)
          }
          if (twitterShareButton) {
            twitterShareButton.dataset.message = (data.answer);
          }
        }

      })
      .catch((error) => {
        console.log(error);
        messageElement.classList.add('error');
        messageElement.textContent = 'Oops! Something went wrong. Please try again. ';
      })
      .finally(() => {
        chatbox.scrollTo(0, chatbox.scrollHeight);
        isRequestPending = false;
      });
  };
  let outgoingMessageCount = 0;
  let leadFormShown = false; // Flag to track if the lead form has been shown

  const handleChat = () => {
    if (isRequestPending) return;
    isRequestPending = true;
    userMessage = chatInput.value.trim();
    if (!userMessage) return;
    chatInput.value = '';
    chatInput.style.height = `${inputInitHeight}px`;
    chatbox.appendChild(createChatLi(userMessage, 'outgoing'));
    chatbox.scrollTo(0, chatbox.scrollHeight);
    // Increment outgoing message count
    outgoingMessageCount++;

    if (outgoingMessageCount >= 2 && !leadFormShown) { // Adjust threshold as needed
      showLeadFormAfterDelay();
      leadFormShown = true; // Set flag to true to prevent further showing
    }

    setTimeout(() => {
      const incomingChatLi = createChatLi('Thinking...', 'incoming');
      chatbox.appendChild(incomingChatLi);
      chatbox.scrollTo(0, chatbox.scrollHeight);
      generateResponse(incomingChatLi);
    }, 600);
  };

  chatInput.addEventListener('input', () => {
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
  });

  chatInput.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey && window.innerWidth > 800) {
      e.preventDefault();
      handleChat();
    }
  });

  sendChatBtn.addEventListener('click', handleChat);

  closeBtn.addEventListener('click', () => {
    document.body.classList.remove('show-kbucket-chatbot');
  });

  chatbotToggler.addEventListener('click', () => {
    document.body.classList.toggle('show-kbucket-chatbot');
  });

  const showLeadFormAfterDelay = () => {
    setTimeout(() => {

      const leadForm = document.createElement('div');
      leadForm.innerHTML = `
                <div class="lead-form">
                    <h3>Provide your contact information</h3>
                    <input type="text" id="lead-name" placeholder="Your Name">
                    <input type="text" id="lead-phone" placeholder="Your Phone">
                    <input type="email" id="lead-email" placeholder="Your Email">
                    <button id="lead-submit">Submit</button>
                    <button id="lead-skip">Skip</button>
                </div>
            `;
      const kbucketChatbotDiv = document.querySelector('.kbucket-chatbot');

      kbucketChatbotDiv.appendChild(leadForm);
      const submitButton = leadForm.querySelector('#lead-submit');
      const skipButton = leadForm.querySelector('#lead-skip');

      submitButton.addEventListener('click', () => {
        const leadData = {
          chatbot_id: String(chatbotID),
          name: document.getElementById('lead-name').value,
          phone: document.getElementById('lead-phone').value,
          email: document.getElementById('lead-email').value
        };

        // Send lead data to API
        fetch('https://backend.botsfornonporfits.com/AddLeadsDataToChatBot', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(leadData)
        }).then(response => {
          // Handle response
        }).catch(error => {
          console.error('Error:', error);
        });

        // Remove lead form
        leadForm.remove();
      });

      skipButton.addEventListener('click', () => {
        leadForm.remove();
      });
    }, 0); // Show form after 15 seconds
  };

}