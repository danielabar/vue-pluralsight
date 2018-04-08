import Vue from 'vue'
import Post from '../../../src/theme/Post.vue'

describe('Post.vue', () => {
  // re-usable function to create component for testing
  const createComponent = () => {
    const PostConstructor = Vue.extend(Post)
    const comp = new PostConstructor({
      propsData: {
        link: 'http://www.pluralsight.com'
      }
    }).$mount()
    return comp
  }
  it('renders link', () => {
    const comp = createComponent()
    expect(comp.$el.querySelector('.card-footer-item').getAttribute('href')).to.equal('http://www.pluralsight.com')
  })

  it('updates href when property link changes', (done) => {
    const comp = createComponent()
    expect(comp.$el.querySelector('.card-footer-item').getAttribute('href')).to.equal('http://www.pluralsight.com')
    // change link
    comp.link = 'http://fullstackweekly.com'
    // wait for dom cycle to complete rendering after link updated
    Vue.nextTick(() => {
      expect(comp.$el.querySelector('.card-footer-item').getAttribute('href')).to.equal('http://fullstackweekly.com')
      done()
    })
  })
})
