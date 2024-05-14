class PostsController < ApplicationController
  def index
    @posts = Post.order(id: "DESC")
  end

  def new
  end

  def create  
    # 保存したデータのレコードを受け取る
    post = Post.create(content: params[:content])
    render json:{ post: post } # JSON形式でレスポンスを返す
  end
end
