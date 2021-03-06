import { Vue } from 'nuxt-property-decorator';

export default class Slug extends Vue {
  name: string = '';
  title: string = '';
  content: string = '';
  excerpt: string = '';
  tags: Array<string> = [];

  defaultHead(category: string) {
    return {
      title: `Fabricio Nogueira | ${category} - ${this.title}`,
      meta: [
        {
          hid: 'og:title',
          name: 'og:title',
          content: this.excerpt,
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.tags.join(','),
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: this.excerpt,
        },
      ],
    };
  }

  async load(category: string) {
    const { html, attributes } = await import(
      `@/contents/${category}/${this.$route.params.slug}.md`
    );
    this.name = this.$route.params.slug;
    this.content = html;
    this.title = attributes.title;
    this.tags = attributes.tags;
    this.excerpt = attributes.excerpt;
  }
}
