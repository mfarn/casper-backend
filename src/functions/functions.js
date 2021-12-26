function noNews () {
    return {
            "fulfillmentMessages": [
              {
                  "text": {
                      "text": [
                          "Infelizmente não temos notícias desse tema! :("
                      ]
                  },
                  "platform": "FACEBOOK"
              },
              {
                  "quickReplies": {
                      "title": "Escolha outra categoria:",
                      "quickReplies": [
                          "Esportes",
                          "Política",
                          "Entretenimento",
                          "Famosos"
                      ]
                  },
                  "platform": "FACEBOOK"
              },
          ]
            }
  }
  
  function carousel(news) {
    cardsNews = cards(news)
    return {
            "fulfillmentMessages": [
              {
                  "payload": {
                      "facebook": {
                          "attachment": {
                              "payload": {
                                  "template_type": "generic",
                                  "elements": cardsNews
                              },
                              "type": "template"
                          }
                      }
                  },
                  "platform": "FACEBOOK"
              }
          ]
          }
  }

  function cards(news) {

    const cards = [];
            news.forEach(el => {
            cards.push({
                "title": el.title,
                "subtitle": el.description,
                "image_url": el.imageUrlPlaceHolder,
                "default_action": {
                    "webview_height_ratio": "tall",
                    "messenger_extensions": false,
                    "type": "web_url",
                    "url": el.link
                },
                "buttons": [
                    {
                        "title": "Acessar",
                        "url": el.link,
                        "type": "web_url"
                    }
                ],
            })
            });
            return cards

  }
  
  module.exports = {
    noNews,
    carousel,
  }