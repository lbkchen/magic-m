module PlacesHelper
  def get_place_type(lat, lon)
    API_KEY = Rails.application.secrets.google_places_key
    @client = GooglePlaces::Client.new(API_KEY)
    spots = @client.spots(lat, lon)
    spots.each do |spot|
      puts spot.name
      puts spot.types
    end
  end
end
