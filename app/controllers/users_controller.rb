class UsersController < ApplicationController

  def index
    return nil if params[:keyword] == ""
    @users = User.where('name LIKE(?)', "%#{params[:keyword]}%").where.not(id: [current_user.id]).limit(10)
    # カレントユーザーのIDが１だとして、そのほかのユーザーたちが２、３だとしますう。
    # ユーザー全体は１〜１０までの数字だとして、where.notでID１〜３までを外すことができますね
    # 詳しくはwhere.notの使い方を理解していないとわからないと思うのでそこは使い方を検索して、自分の知識として使えるようにしてみてください！
    respond_to do |format|
      format.html
      format.json
    end
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end
end
