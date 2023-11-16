require "test_helper"

class Api::TickTackToeControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_tick_tack_toes_index_url
    assert_response :success
  end
end
