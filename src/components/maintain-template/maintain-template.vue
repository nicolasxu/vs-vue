<template>
  <div class="maintain-template">
    
    <div>
      <ul>
        <li v-for="template in templates" @click="getOne(template._id)" class="template-title"> {{template._id}} - {{template.name}}</li>
      </ul>
    </div>

    <form class="uk-form uk-form-stacked">
      
      <fieldset>
          <legend>Maintain Template</legend>
          <div class="uk-form-row">
            <label class="uk-form-label">Name</label>
            <input type="text" v-model="workingTemplate.name"/>
          </div>
          <div class="uk-form-row">
            <label class="uk-form-label">HTMl</label>
            <textarea  rows="10" placeholder="HTML string"
            v-model="workingTemplate.html"></textarea>
          </div>
          <div class="uk-form-row">
            <label class="uk-form-label">CSS</label>
            <textarea  rows="10" placeholder="CSS string"
            v-model="workingTemplate.css"></textarea>
          </div>
          <div class="uk-form-row">
            <label class="uk-form-label">JavaScript</label>
            <textarea  rows="10" placeholder="JavaScript string"
            v-model="workingTemplate.js"></textarea>
          </div>        
      </fieldset>
      <br/>
      <br/>
      <fieldset>
        <legend>Template Params</legend>
        <input type="checkbox" id="is-default-checkbox" v-model="workingTemplate.isDefault"/>
        <label for="is-default-checkbox" >Is Default</label>
        <br/>
        <br/>
        <input type="checkbox" id="is-active-checkbox" v-model="workingTemplate.active"/>
        <label for="is-active-checkbox">Is Active</label>
      </fieldset>
      <br/>
      <br/>
      <fieldset>
        <button class="uk-button uk-button-primary" 
        v-show="!tid"
        @click.prevent="createTemplate">Create</button>

        <button class="uk-button uk-button-primary" v-show="tid"
        @click.prevent="updateTemplate"
        >Update</button>

        <button class="uk-button uk-button-danger" v-show="tid"
        @click.prevent="deleteTemplate"
        >Delete</button>
        
      </fieldset>
    </form>

  </div>

</template>

<script>
  import api from '../../util/api'
  export default {
    name: 'MaintainTemplate',
    components: {},
    data() {
      return {
        tid: '',
        templates: [],
        workingTemplate: {
          name:'',
          html: '',
          css: '',
          js: '',
          active: true,
          isDefault: true
        }

      }
    },
    async created() {
  
      this.getAll()
      this.getOne(this.tid)

    },
    methods: {
      async createTemplate() {
        console.log('template to create', this.workingTemplate)

        let res = await api.template.createTemplate(this.workingTemplate)

        this.getAll()



      },
      async updateTemplate() {
        let templateCopy = JSON.parse(JSON.stringify(this.workingTemplate))
        delete templateCopy._id
        delete templateCopy.err_code
        delete templateCopy.err_msg

        let res = await api.template.updateTemplate(this.tid, templateCopy)
        if (!res.data.updateTemplate.err_code) {
          this.$notify({
            group: 'foo',
            type: 'success',
            title: 'Update Template Success!',
            text: 'Please continue'
          })
        } else {
          // error
          this.$notify({
            group: 'foo',
            type: 'error',
            title: 'Update Template Error!',
            text: 'Please read console log'
          })          
        }

      },
      async deleteTemplate() {
        let confirmed = confirm('Do you really want to delete this template?')
        if (!confirmed) {
          return
        }
        if (this.tid) {
          await api.template.deleteTemplate(this.tid)
          this.getAll()
        }
      },
      async getAll() {
        let res = await api.template.getTemplates()
        this.templates = res.data.templates.docs        
      },
      async getOne (tid) {
        if (tid) {
          let res = await api.template.getTemplateById(tid)          
          this.workingTemplate = res.data.template
          this.tid = tid
        }
      }
    }
  }
  
</script>

<style lang="scss" scoped>
  .maintain-template {
    padding: 32px;
    .template-title {
      &:hover {
        background-color: #ccc;
        cursor: pointer;
      }
    }
    textarea, input[type=text] {
      width: 100%;
    }
    label[for=is-active-checkbox], label[for=is-default-checkbox] {
      cursor: pointer;
    }
  }

</style>