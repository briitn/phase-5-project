require 'openai'

class Chatbot

  def initialize(api_key)

    OpenAI.configure do |config|
    config.access_token = ENV.fetch('OPENAI_API_KEY')
   
end
    @client =OpenAI::Client.new

  end

  def respond_to(message)
    response = @client.chat(
      parameters: {
          model: "gpt-3.5-turbo", 
          messages: [{ role: "user", content: message}], # Required.
          temperature: 0.7,
      })


    response
  end
end