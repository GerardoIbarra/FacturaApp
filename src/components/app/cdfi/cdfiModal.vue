<template>
  <div v-if="isOpen" class="fixed z-10 inset-0 overflow-y-auto">
    <div class="flex items-center justify-center min-h-max px-4 text-center">
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
        >&#8203;</span
      >
      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-3/4"
      >
        <div class="bg-white light px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                Crear Nuevo CDFI
              </h3>
              <div class="mt-2">
                <form @submit.prevent="onSubmit">
                  <div class="flex flex-col sm:flex-row sm:space-x-3">
                    <FormField
                      v-slot="{ field }"
                      name="documentType"
                      class="w-full sm:w-1/2"
                    >
                      <FormItem>
                        <FormLabel class="text-black"
                          >Tipo de documento</FormLabel
                        >
                        <FormControl>
                          <Select
                            v-bind="field"
                            v-model="formData.documentType"
                          >
                            <SelectTrigger class="w-full">
                              <SelectValue
                                placeholder="Selecciona un documento"
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="Factura">
                                  Factura
                                </SelectItem>
                                <SelectItem value="Recibo de honorarios">
                                  Recibo de honorarios
                                </SelectItem>
                                <SelectItem value="Donativo">
                                  Donativo
                                </SelectItem>
                                <SelectItem value="Nota de cargo">
                                  Nota de cargo
                                </SelectItem>
                                <SelectItem value="Recibo de Arrendamiento">
                                  Recibo de Arrendamiento
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </FormField>
                    <FormField
                      v-slot="{ field }"
                      name="moneda"
                      class="w-full sm:w-1/2"
                    >
                      <FormItem>
                        <FormLabel class="text-black">Moneda</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            v-bind="field"
                            v-model="formData.moneda"
                            :value="Monedavalue"
                            disabled
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </FormField>

                    <FormField
                      v-slot="{ field }"
                      name="serie"
                      class="w-full sm:w-1/2 px-3"
                    >
                      <FormItem>
                        <FormLabel class="text-black">Serie</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Ejemplo: 17317"
                            v-bind="field"
                            v-model.number="formData.serie"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </FormField>

                    <FormField
                      v-slot="{ field }"
                      name="useCdfi"
                      class="w-full sm:w-1/2"
                    >
                      <FormItem>
                        <FormLabel class="text-black">Uso de CDFi</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Ejemplo: G01"
                            v-bind="field"
                            v-model="formData.useCdfi"
                            class="w-full"
                          />
                        </FormControl>
                      </FormItem>
                    </FormField>
                  </div>
                  <div class="flex flex-col sm:flex-row sm:space-x-3">
                    <FormField
                      v-slot="{ field }"
                      name="formaPago"
                      class="w-full sm:w-1/2"
                    >
                      <FormItem>
                        <FormLabel class="text-black">Forma de pago</FormLabel>
                        <FormControl>
                          <Select v-bind="field" v-model="formData.formaPago">
                            <SelectTrigger class="w-full">
                              <SelectValue
                                placeholder="Seleccione un forma pago"
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="Efectivo">
                                  Efectivo
                                </SelectItem>
                                <SelectItem value="Tarjeta de credito">
                                  Tarjeta de credito
                                </SelectItem>
                                <SelectItem value="Monedero Electronico">
                                  Monedero Electronico
                                </SelectItem>
                                <SelectItem value="Tarjeta de debito">
                                  Tarjeta de debito
                                </SelectItem>
                                <SelectItem value="Confusion de pago">
                                  Confusion de pago
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </FormField>
                    <FormField
                      v-slot="{ field }"
                      name="count"
                      class="w-full sm:w-1/2"
                    >
                      <FormItem>
                        <FormLabel class="text-black">Cantidad</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Ejemplo: 1"
                            v-bind="field"
                            v-model="formData.count"
                            class="w-full"
                          />
                        </FormControl>
                      </FormItem>
                    </FormField>
                    <FormField
                      v-slot="{ field }"
                      name="claveProdServ"
                      class="w-full sm:w-1/2"
                    >
                      <FormItem>
                        <FormLabel class="text-black"
                          >Clave de producto</FormLabel
                        >
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Ejemplo: 43232408"
                            v-bind="field"
                            v-model="formData.claveProdServ"
                            class="w-full"
                          />
                        </FormControl>
                      </FormItem>
                    </FormField>
                    <FormField
                      v-slot="{ field }"
                      name="claveUnidad"
                      class="w-full sm:w-1/2"
                    >
                      <FormItem>
                        <FormLabel class="text-black">Clave de Sat</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Ejemplo: 60121001"
                            v-bind="field"
                            v-model="formData.claveUnidad"
                          />
                        </FormControl>
                      </FormItem>
                    </FormField>
                  </div>
                  <div class="flex flex-col sm:flex-row sm:space-x-4">
                    <FormField
                      v-slot="{ field }"
                      name="unidad"
                      class="w-full sm:w-3/4"
                    >
                      <FormItem>
                        <FormLabel class="text-black">Unidad</FormLabel>
                        <FormControl>
                          <Select v-bind="field" v-model="formData.unidad">
                            <SelectTrigger class="w-full">
                              <SelectValue
                                placeholder="Selecciona un documento"
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="Pescar"> Pescar </SelectItem>
                                <SelectItem value="Unidad de servicio">
                                  Unidad de servicio
                                </SelectItem>
                                <SelectItem value="Carga masiva">
                                  Carga masiva
                                </SelectItem>
                                <SelectItem value="Grupos"> Grupos </SelectItem>
                                <SelectItem value="Equipos">
                                  Equipos
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </FormField>
                    <FormField
                      v-slot="{ field }"
                      name="valueUnity"
                      class="w-full sm:w-3/4"
                    >
                      <FormItem>
                        <FormLabel class="text-black">Valor Unitario</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Ejemplo: 100"
                            v-bind="field"
                            v-model="formData.valueUnity"
                          />
                        </FormControl>
                      </FormItem>
                    </FormField>
                    <FormField
                      v-slot="{ field }"
                      name="descuento"
                      class="w-full sm:w-3/4"
                    >
                      <FormItem>
                        <FormLabel class="text-black"> Descuento </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Ejemplo: 10.00"
                            v-bind="field"
                            v-model="formData.descuento"
                          />
                        </FormControl>
                      </FormItem>
                    </FormField>
                  </div>

                  <div>
                    <FormField
                      v-slot="{ field }"
                      name="description"
                      class="w-full sm:w-1/2"
                    >
                      <FormItem>
                        <FormLabel class="text-black">Descripción</FormLabel>
                        <FormControl>
                          <Textarea
                            type="text"
                            placeholder=""
                            v-bind="field"
                            v-model="formData.description"
                          />
                        </FormControl>
                      </FormItem>
                    </FormField>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            @click="closeModal"
            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-600 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Cancelar
          </button>
          <button
            @click="onSubmit"
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-black hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Crear
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useModal } from "../../../hooks/useModal";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";

import { Input } from "@/components/ui/input";
import { CfdiData } from "@/interface/interface";

const Monedavalue = ref("MXN");
const UID = ref("55c0fdc67593d");
const MetodoPago = ref("PUE");

const { createCfdi } = useModal();

const formSchema = toTypedSchema(
  z.object({
    serie: z.number().min(2).max(50),
    documentType: z.string().nonempty(),
    formaPago: z.string().nonempty(),
    useCdfi: z.string().nonempty(),
    count: z.number().min(1).max(50),
    claveProdServ: z.string().nonempty(),
    claveUnidad: z.string().nonempty(),
    unidad: z.string().nonempty(),
    valueUnity: z.number().min(1).max(50),
    description: z.string().nonempty(),
    descuento: z.string().nonempty(),
  })
);

const form = useForm({
  validationSchema: formSchema,
});

const formData = ref({
  documentType: "",
  moneda: Monedavalue.value,
  serie: 0,
  formaPago: "",
  useCdfi: "",
  count: 0,
  claveProdServ: "",
  claveUnidad: "",
  unidad: "",
  valueUnity: 0,
  description: "",
  descuento: "",
  UID: UID.value,
  metodoPago: MetodoPago.value,
});

const onSubmit = form.handleSubmit(() => {
  const propsData: CfdiData = {
    Receptor: { UID: formData.value.UID },
    TipoDocumento: formData.value.documentType,
    Conceptos: [
      {
        ClaveProdServ: formData.value.claveProdServ,
        Cantidad: formData.value.count,
        ClaveUnidad: formData.value.claveUnidad,
        Unidad: formData.value.unidad,
        ValorUnitario: formData.value.valueUnity,
        Descripcion: formData.value.description,
        Descuento: formData.value.descuento,
      },
    ],
    UsoCFDI: formData.value.useCdfi,
    Serie: formData.value.serie,
    FormaPago: formData.value.formaPago,
    MetodoPago: formData.value.metodoPago,
    Moneda: formData.value.moneda,
    EnviarCorreo: true,
  };
  createCfdi(propsData);
});

const props = defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(["close", "create"]);

const closeModal = () => {
  emit("close");
};
</script>
