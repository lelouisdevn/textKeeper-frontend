<template>
  <div class="fluid-container" id="app">
    <div class="left-col">
      <div class="sidebar">
        <div class="">
          <i class="fa fa-bars"></i>
        </div>
        <div class="bottom-sidebar">
          <div class="">
            <i class="fa fa-user"></i>
          </div>
          <div class="">
            <router-link to="/new" style="color: black;">
              <i class="fa fa-plus"></i>
            </router-link>
          </div>
          <div class="">
            <i class="fa fa-edit"></i>
          </div>
          <div class="">
            <i class="fa fa-star"></i>
          </div>
          <div class="">
            <i class="fa fa-search"></i>
          </div>
          <div class="">
            <router-link to="/trashbin" style="color: black;">
              <i class="fa fa-trash"></i>
            </router-link>
          </div>
          <div class="">
            <i class="fa fa-cog"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="right-col">
      <div class="header row" style="margin: auto;">
        <div class="col-3 logo">
          <router-link to="/">
            textKeeper
          </router-link>
        </div>
        <div class="col-6">
          
        </div>
        <div style="text-align: right;" class="col-3">
          <i class="fas fa-bars"></i>
        </div>
      </div>
      <div class="content">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>