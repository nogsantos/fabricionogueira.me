import { Vue, Component } from 'nuxt-property-decorator';
import { Content } from '@/components/index';

@Component({
  components: {
    'fn-content': Content
  }
})
export default class SnippetsSlug extends Vue {
  params: any = '';
  name: String = '';
  title: String = '';
  content: String = '';
  excerpt: String = '';
  tags: Array<String> = [];

  head() {
    return {
      title: `Snippet - Fabricio Nogueira | ${this.name}`,
      meta: [
        {
          hid: 'og:title',
          name: 'og:title',
          content: this.excerpt
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.tags.join(',')
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: this.excerpt
        }
      ]
    };
  }

  async fetch() {
    const { html, attributes } = await import(
      `@/contents/snippets/${this.$route.params.slug}.md`
    );
    this.name = this.$route.params.slug;
    this.content = html;
    this.title = attributes.title;
    this.tags = attributes.tags;
    this.excerpt = attributes.excerpt;
  }
}
