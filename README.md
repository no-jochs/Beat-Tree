#BeatTree README

##BeatTree Basics
BeatTree is an app designed to allow users to create relationships between tracks in the Spotify Database.  Given track nodes (i.e. track A = _Scarlet Begonias by Sublime_ and track B = _Funky Drummer by James Brown_), we can create this relationship:

> `(A)-[:SAMPLES]->(B)`

Other types of relationships may be:

* `-[:REMIXES]->`
* `-[:COVERS]->`

BeatTree is available for anyone to browse, however a user must be signed in to create relationships and add track nodes to BeatTree's Database.

For more information on how BeatTree works and how to add nodes as well as create relationships, check out the [learnmore](http://www.beat-tree.com/learnmore) page on beat-tree.com.

##BeatTree Stack
The BeatTree stack uses the following libraries, gems, and technologies:

* **[Ruby on Rails](http://rubyonrails.org/)**: Ruby on Rails is an open source web framework built in Ruby.  It champions convention over configuration and adheres to a relatively traditional MVC architecture.

* **[Backbone.js](http://backbonejs.org/)**: Backbone.js is a JS library that brings MVC architecture to the client-side.  The client-side models are synchronized through BeatTrees JSON API.

* **[D3.js](http://d3js.org/)**: D3.js is a powerful data visualization library built in JavaScript.  It is used in BeatTree to create the graphical, directed-graphs of music heritage.  It employs SVG templates to bring the graph to life.

* **[Spotify API](https://developer.spotify.com/web-api/)**: BeatTree uses the Spotify JSON API to fetch data about tracks in the Spotify database.  Additionally, it uses Spotify Widgets which allow users to play music directly from their Spotify client.

* **[Neo4j](http://neo4j.com/)**: The BeatTree database is a Neo4j database.  Neo4j is a graph database which uses pattern matching to return results.  It was chosen for this application due to the join-intensive nature of producing subgraphs.  BeatTree's Neo4j database is actually running on a separate server from the Rails backend and is queried via a RESTful interface.

* **[Neo4j.rb](https://github.com/neo4jrb/neo4j)**: Neo4j.rb is an open source Active Model gem which allows for easy ORM from within Rails.  Active Record is stripped out of Rails in this application and replaced with Neo4j.rb's Active Node and Active Rel.

* **[Heroku](https://www.heroku.com/)**: BeatTree is deployed using the Heroku platform.

## Future of BeatTree
Here are some ideas which may come to BeatTree soon:

* Integration with [Echo Nest](http://developer.echonest.com/) API.  Spotify is great, but it doesn't have all the music that exists.  In the future, BeatTree may be able to integrate with the Echo Nest API to find additional songs which Spotify doesn't have.

* New node types.  The natural next steps are Artists, Albums, and Bands.  However, the relationships contained in BeatTree become exponentially more interesting and new types of nodes are added.  In the future we may include integration for music genres, adding works of literature, TV shows, movies, and other media.

* New relationship types.  Possibly even custom relationship types.  The more types of relationships there are, the more dense the graph becomes, and the more interesting it becomes to explore.

* Spotify Playlist exporting.  We may add support to create Spotify playlists based on predecessor/progeny relationships and subgraphs.

## Your Support
If you find bugs or have ideas for features, we'd love to hear them!  Please submit issues or feature requests [here](https://github.com/johnochs/beat-tree/issues).  Or, you can email John directly [here](mailto:john.ochs@gmail.com).
