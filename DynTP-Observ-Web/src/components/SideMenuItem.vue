<script setup lang="ts">
import {computed, type Component} from "vue";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import router from "../router";
import type {RouterVO} from "../types/vo/system/RouterVO.ts";

// Assign a stable component name for recursive self-references.
defineOptions({name: "SideMenuItem"});

// Receive one menu node from the backend route tree.
const props = defineProps<{ menu: RouterVO; }>();

// Keep hidden children out of the rendered menu.
const visibleChildren = computed(() =>
    (props.menu.children ?? []).filter(child => !child.hidden)
);

// A node with visible children must be rendered as a submenu.
const hasChildren = computed(() => visibleChildren.value.length > 0);

// Resolve the registered route path and fall back to the backend path
// when the route has not been added to the router yet.
const menuIndex = computed(() => {
  if (props.menu.name && router.hasRoute(props.menu.name)) {
    return router.resolve({name: props.menu.name}).path;
  }
  return props.menu.path;
});

// Resolve an Element Plus icon by its backend-provided component name.
function resolveMenuIcon(icon?: string): Component | undefined {
  return icon ? ElementPlusIconsVue[icon as keyof typeof ElementPlusIconsVue] : undefined;
}
</script>

<template>
  <!-- Render menu nodes with children as expandable submenus. -->
  <el-sub-menu v-if="hasChildren" :index="menuIndex">
    <template #title>
      <span class="menu-symbol" aria-hidden="true">
        <el-icon v-if="resolveMenuIcon(menu.meta.icon)">
          <component :is="resolveMenuIcon(menu.meta.icon)"/>
        </el-icon>
        <template v-else>•</template>
      </span>
      <span class="menu-text">{{ menu.meta.title }}</span>
    </template>

    <!-- Recursively render every visible child at the next menu level. -->
    <SideMenuItem
        v-for="child in visibleChildren"
        :key="child.name"
        :menu="child"
    />
  </el-sub-menu>

  <!-- Render leaf nodes as navigable menu items. -->
  <el-menu-item v-else :index="menuIndex">
    <span class="menu-symbol" aria-hidden="true">
      <el-icon v-if="resolveMenuIcon(menu.meta.icon)">
        <component :is="resolveMenuIcon(menu.meta.icon)"/>
      </el-icon>
      <template v-else>•</template>
    </span>
    <span class="menu-text">{{ menu.meta.title }}</span>
  </el-menu-item>
</template>
