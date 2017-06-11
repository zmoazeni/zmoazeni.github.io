module Jekyll
  class VersionedPage < Page
    def initialize(site, base, dir, version, post)
      @site = site
      @base = base
      @dir = dir
      @name = "#{version}/#{post.url}#{post.data["ext"]}"
      process(@name)
      self.content = post.content
      self.data = post.data
      self.data["layout"] = "#{version}/post"
    end
  end

  class VersionGenerator < Generator
    VERSIONS = ["v2013"]
    
    def generate(site)
      VERSIONS.each do |version|
        site.posts.docs.each do |post|
          site.pages << VersionedPage.new(site, site.source, "", version, post)
        end
      end
    end
  end
end