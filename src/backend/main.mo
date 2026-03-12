import Time "mo:core/Time";
import Map "mo:core/Map";
import List "mo:core/List";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Int "mo:core/Int";
import Nat "mo:core/Nat";
import Char "mo:core/Char";
import Order "mo:core/Order";

actor {
  module Driver {
    public func compare(d1 : Driver, d2 : Driver) : Order.Order {
      Int.compare(d1.position, d2.position);
    };
  };

  module Race {
    public func compare(r1 : Race, r2 : Race) : Order.Order {
      Text.compare(r1.date, r2.date);
    };
  };

  module Achievement {
    public func compare(a1 : Achievement, a2 : Achievement) : Order.Order {
      Int.compare(a1.year, a2.year);
    };
  };

  module Message {
    public func compare(m1 : Message, m2 : Message) : Order.Order {
      Int.compare(m2.timestamp, m1.timestamp);
    };
  };

  type Id = Nat;

  type Driver = {
    id : Id;
    name : Text;
    number : Nat;
    nationality : Text;
    position : Int;
    bio : Text;
    wins : Nat;
    podiums : Nat;
  };

  type Race = {
    id : Id;
    name : Text;
    location : Text;
    date : Text;
    circuit : Text;
    status : { #upcoming; #completed };
  };

  type Achievement = {
    id : Id;
    title : Text;
    year : Int;
    description : Text;
    category : { #championship; #podium; #record };
  };

  type Sponsor = {
    id : Id;
    name : Text;
    tier : { #title; #official; #partner };
    website : Text;
  };

  type Message = {
    id : Id;
    name : Text;
    email : Text;
    message : Text;
    timestamp : Time.Time;
  };

  // Persistent storage
  let drivers = Map.empty<Id, Driver>();
  let races = Map.empty<Id, Race>();
  let achievements = Map.empty<Id, Achievement>();
  let sponsors = Map.empty<Id, Sponsor>();
  let messages = Map.empty<Id, Message>();

  var nextId = 1;

  // Seed data
  public shared ({ caller }) func initSeedData() : async () {
    if (drivers.size() == 0) {
      let sampleDrivers = [
        {
          id = nextId;
          name = "Michael Samar";
          number = 7;
          nationality = "German";
          position = 1;
          bio = "6-time World Champion";
          wins = 92;
          podiums = 155;
        },
        {
          id = nextId + 1;
          name = "Weidi Samar";
          number = 44;
          nationality = "British";
          position = 2;
          bio = "7-time World Champion";
          wins = 103;
          podiums = 181;
        },
      ];
      for (driver in sampleDrivers.values()) {
        drivers.add(driver.id, driver);
      };
      nextId += sampleDrivers.size();
    };

    if (races.size() == 0) {
      let sampleRaces = [
        {
          id = nextId;
          name = "Monaco Grand Prix";
          location = "Monte Carlo, Monaco";
          date = "2024-05-26";
          circuit = "Circuit de Monaco";
          status = #upcoming;
        },
        {
          id = nextId + 1;
          name = "Canadian Grand Prix";
          location = "Montreal, Canada";
          date = "2024-06-09";
          circuit = "Circuit Gilles Villeneuve";
          status = #upcoming;
        },
      ];
      for (race in sampleRaces.values()) {
        races.add(race.id, race);
      };
      nextId += sampleRaces.size();
    };

    if (achievements.size() == 0) {
      let sampleAchievements = [
        {
          id = nextId;
          title = "World Constructors' Champion";
          year = 2019;
          description = "Dominant 2019 season";
          category = #championship;
        },
        {
          id = nextId + 1;
          title = "Pole Position Record";
          year = 2020;
          description = "Most pole positions in a single season";
          category = #record;
        },
      ];
      for (achievement in sampleAchievements.values()) {
        achievements.add(achievement.id, achievement);
      };
      nextId += sampleAchievements.size();
    };

    if (sponsors.size() == 0) {
      let sampleSponsors = [
        {
          id = nextId;
          name = "Mega Energy";
          tier = #title;
          website = "https://megaenergy.com";
        },
        {
          id = nextId + 1;
          name = "Swift Tires";
          tier = #official;
          website = "https://swifttires.com";
        },
      ];
      for (sponsor in sampleSponsors.values()) {
        sponsors.add(sponsor.id, sponsor);
      };
      nextId += sampleSponsors.size();
    };
  };

  // CRUD operations - Drivers
  public shared ({ caller }) func createDriver(name : Text, number : Nat, nationality : Text, position : Int, bio : Text, wins : Nat, podiums : Nat) : async Driver {
    let driver : Driver = {
      id = nextId;
      name;
      number;
      nationality;
      position;
      bio;
      wins;
      podiums;
    };
    drivers.add(nextId, driver);
    nextId += 1;
    driver;
  };

  public query ({ caller }) func getDrivers() : async [Driver] {
    drivers.values().toArray().sort();
  };

  public query ({ caller }) func getDriver(id : Id) : async ?Driver {
    drivers.get(id);
  };

  public shared ({ caller }) func updateDriver(id : Id, name : Text, number : Nat, nationality : Text, position : Int, bio : Text, wins : Nat, podiums : Nat) : async () {
    if (not drivers.containsKey(id)) {
      Runtime.trap("Driver with id " # id.toText() # " does not exist.");
    };
    let driver : Driver = {
      id;
      name;
      number;
      nationality;
      position;
      bio;
      wins;
      podiums;
    };
    drivers.add(id, driver);
  };

  public shared ({ caller }) func deleteDriver(id : Id) : async () {
    if (not drivers.containsKey(id)) {
      Runtime.trap("Driver with id " # id.toText() # " does not exist.");
    };
    drivers.remove(id);
  };

  // CRUD operations - Races
  public shared ({ caller }) func createRace(name : Text, location : Text, date : Text, circuit : Text) : async Race {
    let race : Race = {
      id = nextId;
      name;
      location;
      date;
      circuit;
      status = #upcoming;
    };
    races.add(nextId, race);
    nextId += 1;
    race;
  };

  public query ({ caller }) func getRaces() : async [Race] {
    races.values().toArray().sort();
  };

  public query ({ caller }) func getRace(id : Id) : async ?Race {
    races.get(id);
  };

  public shared ({ caller }) func updateRace(id : Id, name : Text, location : Text, date : Text, circuit : Text, status : { #upcoming; #completed }) : async () {
    if (not races.containsKey(id)) {
      Runtime.trap("Race with id " # id.toText() # " does not exist.");
    };
    let race : Race = {
      id;
      name;
      location;
      date;
      circuit;
      status;
    };
    races.add(id, race);
  };

  public shared ({ caller }) func deleteRace(id : Id) : async () {
    if (not races.containsKey(id)) {
      Runtime.trap("Race with id " # id.toText() # " does not exist.");
    };
    races.remove(id);
  };

  // CRUD operations - Achievements
  public shared ({ caller }) func createAchievement(title : Text, year : Int, description : Text, category : { #championship; #podium; #record }) : async Achievement {
    let achievement : Achievement = {
      id = nextId;
      title;
      year;
      description;
      category;
    };
    achievements.add(nextId, achievement);
    nextId += 1;
    achievement;
  };

  public query ({ caller }) func getAchievements() : async [Achievement] {
    achievements.values().toArray().sort();
  };

  public query ({ caller }) func getAchievement(id : Id) : async ?Achievement {
    achievements.get(id);
  };

  public shared ({ caller }) func updateAchievement(id : Id, title : Text, year : Int, description : Text, category : { #championship; #podium; #record }) : async () {
    if (not achievements.containsKey(id)) {
      Runtime.trap("Achievement with id " # id.toText() # " does not exist.");
    };
    let achievement : Achievement = {
      id;
      title;
      year;
      description;
      category;
    };
    achievements.add(id, achievement);
  };

  public shared ({ caller }) func deleteAchievement(id : Id) : async () {
    if (not achievements.containsKey(id)) {
      Runtime.trap("Achievement with id " # id.toText() # " does not exist.");
    };
    achievements.remove(id);
  };

  // CRUD operations - Sponsors
  public shared ({ caller }) func createSponsor(name : Text, tier : { #title; #official; #partner }, website : Text) : async Sponsor {
    let sponsor : Sponsor = {
      id = nextId;
      name;
      tier;
      website;
    };
    sponsors.add(nextId, sponsor);
    nextId += 1;
    sponsor;
  };

  public query ({ caller }) func getSponsors() : async [Sponsor] {
    sponsors.values().toArray();
  };

  public query ({ caller }) func getSponsor(id : Id) : async ?Sponsor {
    sponsors.get(id);
  };

  public shared ({ caller }) func updateSponsor(id : Id, name : Text, tier : { #title; #official; #partner }, website : Text) : async () {
    if (not sponsors.containsKey(id)) {
      Runtime.trap("Sponsor with id " # id.toText() # " does not exist.");
    };
    let sponsor : Sponsor = {
      id;
      name;
      tier;
      website;
    };
    sponsors.add(id, sponsor);
  };

  public shared ({ caller }) func deleteSponsor(id : Id) : async () {
    if (not sponsors.containsKey(id)) {
      Runtime.trap("Sponsor with id " # id.toText() # " does not exist.");
    };
    sponsors.remove(id);
  };

  // Contact messages
  public shared ({ caller }) func submitMessage(name : Text, email : Text, message : Text) : async Message {
    let newMessage : Message = {
      id = nextId;
      name;
      email;
      message;
      timestamp = Time.now();
    };
    messages.add(nextId, newMessage);
    nextId += 1;
    newMessage;
  };

  public query ({ caller }) func getMessages() : async [Message] {
    messages.values().toArray().sort();
  };

  public query ({ caller }) func getMessage(id : Id) : async ?Message {
    messages.get(id);
  };

  public shared ({ caller }) func deleteMessage(id : Id) : async () {
    if (not messages.containsKey(id)) {
      Runtime.trap("Message with id " # id.toText() # " does not exist.");
    };
    messages.remove(id);
  };

  public shared ({ caller }) func reset() : async () {
    drivers.clear();
    races.clear();
    achievements.clear();
    sponsors.clear();
    messages.clear();
    nextId := 1;
  };
};
