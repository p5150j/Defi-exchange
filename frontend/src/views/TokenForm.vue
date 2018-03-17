<template>
   <vue-form :state="formstate" @submit.prevent="onSubmit" class="myForm">
      <!--"address", "name", "symbol", "decimals", "deprecated", "quote", "active", "zeroex_official", "created_date"-->
      <div class="row">
         <div class="col-xs">
            <div class="box-row">
               <validate tag="label">
                  <span>Name *</span>
                  <input v-model="model.name" required name="name"/>
                  <field-messages name="name">
                     <div slot="required">Value is required</div>
                  </field-messages>
               </validate>
            </div>
         </div>
         <div class="col-xs">
            <div class="box-row">
               <validate tag="label">
                  <span>Address *</span>
                  <input v-model="model.address" required name="address"/>
                  <field-messages name="address">
                     <div slot="required">Value is required</div>
                  </field-messages>
               </validate>
            </div>
         </div>
      </div>
      <hr>
      <div class="row">
         <div class="col-xs">
            <div class="box-row">
               <validate tag="label">
                  <span>Symbol *</span>
                  <input v-model="model.symbol" required name="symbol"/>
                  <field-messages name="symbol">
                     <div slot="required">Value is required</div>
                  </field-messages>
               </validate>
            </div>
         </div>
         <div class="col-xs">
            <div class="box-row">
               <validate tag="label">
                  <span>Decimals *</span>
                  <input v-model="model.decimals" required name="decimals" type="number"/>
               </validate>
            </div>
         </div>
      </div>
      <hr>
      <div class="row">
         <div class="col-xs">
            <div class="box-row">
               <validate tag="label" class="checkboxFour">
                  <span>Active</span>
                  <section>
                     <div class="slideTwo">
                       <input v-model="model.active" name="active" type="checkbox"/>
                        <label for="slideTwo"></label>
                     </div>
                  </section>
               </validate>
            </div>
         </div>
         <div class="col-xs">
            <div class="box-row">
               <validate tag="label">
                  <span>Quote</span>
                  <section>
                     <div class="slideTwo">
                       <input v-model="model.quote" name="quote" type="checkbox"/>
                        <label for="slideTwo"></label>
                     </div>
                  </section>
               </validate>
            </div>
         </div>
         <div class="col-xs">
            <div class="box-row">
               <validate tag="label">
                  <span>Deprecated</span>
                  <section>
                     <div class="slideTwo">
                       <input v-model="model.deprecated" name="deprecated" type="checkbox"/>
                        <label for="slideTwo"></label>
                     </div>
                  </section>
               </validate>
            </div>
         </div>
         <div class="col-xs">
            <div class="box-row">
               <validate tag="label">
                  <span>Zeroex Official</span>
                  <section>
                     <div class="slideTwo">
                        <input v-model="model.zeroex_official" name="zeroex_official" type="checkbox"/>
                        <label for="slideTwo"></label>
                     </div>
                  </section>
               </validate>
            </div>
         </div>
      </div>
    <hr>
      <span>Created date: {{model.created_date || 'n/a'}}</span>
      <div class="messages">
         <h3 v-if="loading">Loading</h3>
         <h3 v-if="error">{{error}}</h3>
      </div>


      <div class="row">
         <div class="col-xs">
            <div class="box-row">
              <button type="submit" :disabled="formstate.$invalid">Submit</button>
            </div>
        </div>
        <div class="col-xs">
           <div class="box-row">
             <button @click.prevent="goBack">Back</button>
           </div>
       </div>
      </div>
   </vue-form>
</template>

<script lang="ts">
    import {Component, Prop} from "vue-property-decorator";
    import {mixins} from "vue-class-component"
    import VueForm from "vue-form";

    @Component({})
    export default class TokenForm extends mixins(VueForm) {
        @Prop()
        private onValidSubmit: (token: any) => Promise<any>;
        @Prop()
        private goBackTo: string;
        @Prop()
        private token: any;
        // @Prop()
        // public $router: any;

        formstate: any = {};
        // @TODO: define interface
        model: any = {...this.token}; // clone // assuming token is never null;

        loading: boolean = false;
        error: any = "";

        created() {

        }

        goBack() {
            this.$router.push({path: "/tokens"});
        };

        onSubmit() {
            if (this.formstate.$invalid) {
                // alert user and exit early
                return;
            }
            const checkboxes = ["active", "quote", "deprecated", "zeroex_official"]; // false are not submitted
            checkboxes.forEach(ch => {
                if (!this.model[ch]) {
                    this.model[ch] = false
                }
            });
            this.loading = true;
            this.onValidSubmit(this.model)
                .then(() => {
                    this.loading = false;
                })
                .catch(error => {
                    this.error = error;
                })
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .myForm {
      padding: 15px;
      background-color: #232222;
      text-align: center;
      width: 70%;
      margin: auto;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
        label {
            display: block;
            padding: 5px;
        }
        input {
          color: #eee;
          border-radius: 40px;
          border: none;
          padding: 8px 12px 10px 12px;
          top: 3px;
          height: 40px;
          border-radius: 50px;
          border: 1px solid rgba(0, 0, 0, 0.5);
          background: #2e2e2e;
          width: 100%;
        }
        span {
            display: block;
        }
    }
    .messages {
       padding: 3px 10px;
       min-height: 50px;
    }
    hr{
      border: 0;
      border-bottom: 1px dashed #cccccc4d;

    }
    $activeColor: #ffa71a; //green
    $darkenColor: darken($activeColor, 20%);
    $background: #3498db;
    .slideTwo {
      width: 80px;
      height: 30px;
      background: #333;
      margin: 20px auto;
      position: relative;
      border-radius: 50px;
      box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.5), 0px 1px 0px rgba(255, 255, 255, 0.2);
      &:after {
        content: '';
        position: absolute;
        top: 14px;
        left: 14px;
        height: 2px;
        width: 52px;
        background: #111;
        border-radius: 50px;
        box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.5), 0px 1px 0px rgba(255, 255, 255, 0.2);
      }
      label {
        display: block;
        width: 22px;
        height: 22px;
        cursor: pointer;
        position: absolute;
        top: 4px;
        z-index: 1;
        left: 4px;
        background: #fcfff4;
        border-radius: 50px;
        transition: all 0.4s ease;
        box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.3);
        background: linear-gradient(top, #fcfff4 0%, #dfe5d7 40%, #b3bead 100%);
        &:after {
          content: '';
          width: 10px;
          height: 10px;
          position: absolute;
          top: 6px;
          left: 6px;
          background: #333;
          border-radius: 50px;
          box-shadow: inset 0px 1px 1px rgba(0,0,0,1), 0px 1px 0px rgba(255,255,255,0.9);
        }
      }
      input[type=checkbox] {
        visibility: hidden;
        &:checked + label {
          left: 54px;
          &:after {
            background: $activeColor; /*activeColor*/
          }
        }
      }
    }
    *{box-sizing: border-box;}

    button {
      outline: 0;
      width:100%;
      padding: 5px 12px;
      display: block;
      color: #9fa8b0;
      font-weight: bold;
      text-shadow: 1px 1px #1f272b;
      border: 1px solid #1c252b;
      border-radius: 3px;
      -moz-border-radius: 3px;
      -webkit-border-radius: 3px;
      background: #2e2e2e;
    }
</style>
