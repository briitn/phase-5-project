class ChatbotController < ApplicationController

        def index
          message = params[:message]
          chatbot = Chatbot.new('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')
          response = chatbot.respond_to(message)
          render json: { response: response }
        end
     
end
