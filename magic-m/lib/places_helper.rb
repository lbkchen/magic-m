module PlacesHelper
  API_KEY = Rails.application.secrets.google_places_key

  ACTIVITY_TYPES = {
    airport:              :adventure,
    amusement_park:       :partying,
    aquarium:             :adventure,
    art_gallery:          :adventure,
    atm:                  :shopping,
    bakery:               :eating,
    bank:                 :work,
    bar:                  :partying,
    beauty_salon:         :shopping,
    book_store:           :shopping,
    bowling_alley:        :partying,
    bus_station:          :unknown,
    cafe:                 :work,
    campground:           :adventure,
    casino:               :partying,
    cemetery:             :mortal_peril,
    church:               :work,
    city_hall:            :partying,
    clothing_store:       :shopping,
    convenience_store:    :shopping,
    courthouse:           :work,
    dentist:              :unknown,
    department_store:     :shopping,
    doctor:               :mortal_peril,
    gas_station:          :adventuring,
    gym:                  :work,
    hospital:             :mortal_peril,
    library:              :work,
    liquor_store:         :partying,
    lodging:              :adventure,
    movie_theater:        :partying,
    museum:               :adventure,
    night_club:           :partying,
    park:                 :adventure,
    parking:              :adventure,
    pet_store:            :shopping,
    pharmacy:             :shopping,
    point_of_interest:    :adventure,
    police:               :mortal_peril,
    post_office:          :work,
    restaurant:           :eating,
    school:               :school,
    shoe_store:           :shopping,
    shopping_mall:        :shopping,
    spa:                  :shopping,
    stadium:              :partying,
    store:                :shopping,
    subway_station:       :adventure,
    train_station:        :adventure,
    transit_station:      :adventure,
    university:           :school,
    zoo:                  :adventure,
  }

  PLACE_TYPES = ACTIVITY_TYPES.keys

  def get_place_type(lat, lon)
    @client = GooglePlaces::Client.new(API_KEY)
    spots = @client.spots(lat, lon, types: PLACE_TYPES, radius: 200)

    activity_counts = Hash.new(0)
    spots.each do |spot|
      spot.types.each { |type| activity_counts[ACTIVITY_TYPES[type.to_sym]] += 1 }
    end
    activity_counts.delete_if { |k, v| k.nil? || v.nil? }

    activity_counts.max_by { |k, v| v }[0]
  end

end
