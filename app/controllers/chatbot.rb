require 'openai'

class Chatbot
  def initialize(api_key)
    @api_key = api_key
    @client = OpenAI::Client.new(access_token: @api_key)
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