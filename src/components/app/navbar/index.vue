<template>
  <Menubar class="bg-neutral-500 py-7 flex items-center justify-end w-full">
    <DropDark />

    <MenubarSeparator />
    <MenubarMenu>
      <MenubarTrigger>
        <Avatar>
          <AvatarImage
            src="https://github.com/radix-vue.png"
            alt="@radix-vue"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </MenubarTrigger>
      <MenubarContent>
        <MenubarItem>
          Configuraciones <MenubarShortcut>⌘T</MenubarShortcut>
        </MenubarItem>

        <MenubarSeparator />
        <MenubarItem>Perfil</MenubarItem>
        <MenubarSeparator />
        <MenubarItem>Cerrar sesion</MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  </Menubar>
</template>

<script setup lang="ts">
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DropDark from "../dropdown/darkIndex.vue";
</script>
