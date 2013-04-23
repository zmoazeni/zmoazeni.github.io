module Jekyll
  class ThisYearTag < Liquid::Tag
    def render(context)
      Time.now.year
    end
  end
end

Liquid::Template.register_tag('thisyear', Jekyll::ThisYearTag)
