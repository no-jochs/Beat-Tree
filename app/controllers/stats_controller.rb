class StatsController < ApplicationController
  
  def index
    @numtracks = Neo4j::Session.query("MATCH (n:Track) RETURN count(n) AS tracks").first.tracks
    @numusers = Neo4j::Session.query("MATCH (n:User) RETURN count(n) AS users").first.users
    @relationships = Neo4j::Session.query("MATCH ()-[r]->() RETURN count(r) AS relationships").first.relationships
    @most_sampled = Track.query_as(:t).match("t<-[r:SAMPLES]-()").return("t, count(r) AS count").order_by("count DESC").limit(5)
    render "index", status: :ok
  end
  
end