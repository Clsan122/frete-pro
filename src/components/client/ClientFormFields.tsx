
import React from "react";
import { UseFormRegister, FieldErrors, Controller, Control } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ClientFormData } from "@/types/client";
import { formatCPF, formatCNPJ, formatBrazilianPhone } from "@/utils/formatters";

interface ClientFormFieldsProps {
  register: UseFormRegister<ClientFormData>;
  errors: FieldErrors<ClientFormData>;
  control: Control<ClientFormData>;
  personType: 'physical' | 'legal';
  onPersonTypeChange: (value: 'physical' | 'legal') => void;
}

export const ClientFormFields: React.FC<ClientFormFieldsProps> = ({
  register,
  errors,
  control,
  personType,
  onPersonTypeChange,
}) => {
  return (
    <>
      <div className="space-y-4 mb-6">
        <Label>Tipo de Pessoa</Label>
        <RadioGroup
          defaultValue={personType}
          onValueChange={(value: 'physical' | 'legal') => onPersonTypeChange(value)}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="physical" id="physical" />
            <Label htmlFor="physical">Pessoa Física</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="legal" id="legal" />
            <Label htmlFor="legal">Pessoa Jurídica</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="name">Nome {personType === 'physical' ? 'Completo' : 'da Empresa'}</Label>
        <Input id="name" {...register("name")} />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        {personType === 'physical' ? (
          <>
            <Label htmlFor="cpf">CPF</Label>
            <Input 
              id="cpf" 
              {...register("cpf")}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                e.target.value = formatCPF(value);
              }}
              maxLength={14}
            />
            {errors.cpf && (
              <p className="text-sm text-red-500">{errors.cpf.message}</p>
            )}
          </>
        ) : (
          <>
            <Label htmlFor="cnpj">CNPJ</Label>
            <Input 
              id="cnpj" 
              {...register("cnpj")}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                e.target.value = formatCNPJ(value);
              }}
              maxLength={18}
            />
            {errors.cnpj && (
              <p className="text-sm text-red-500">{errors.cnpj.message}</p>
            )}
          </>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Telefone</Label>
        <Input 
          id="phone" 
          {...register("phone")}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, '');
            e.target.value = formatBrazilianPhone(value);
          }}
          maxLength={15}
        />
        {errors.phone && (
          <p className="text-sm text-red-500">{errors.phone.message}</p>
        )}
      </div>

      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="address">Endereço</Label>
        <Input id="address" {...register("address")} />
        {errors.address && (
          <p className="text-sm text-red-500">{errors.address.message}</p>
        )}
      </div>
    </>
  );
};
