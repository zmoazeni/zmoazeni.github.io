module Jekyll
  class YearsBlock < Liquid::Block
    def render(context)
      require 'debugger'
      year_groups = context.registers[:site].posts.group_by {|post| post.date.year }
      years = year_groups.keys.sort.reverse
      context.stack do
        years.map do |year|
          context['year'] = year
          context['yearloop'] = {'posts' => year_groups[year].sort_by(&:date).reverse }
          render_all(@nodelist, context)
        end
      end
    end
  end
end

Liquid::Template.register_tag('years', Jekyll::YearsBlock)
